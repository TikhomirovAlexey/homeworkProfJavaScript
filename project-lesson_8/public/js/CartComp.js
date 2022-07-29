Vue.component('cart', {
    data() {
        return {
            cartUrl: '/getCartProducts',
            cartItems: [],
            showCart: false,
        }
    },
    methods: {
        addProduct(product) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find) {
                this.$parent.putJson(`/putProduct/${find.id_product}`, { quantity: 1 });
                find.quantity++;
            } else {
                let prod = Object.assign({ quantity: 1 }, product);
                this.$parent.postJson('/postProduct', prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod);
                        }
                    });
            }
        },
        remove(product) {
            if (product.quantity > 1) {
                this.$parent.putJson(`/putProduct/${product.id_product}`, { quantity: -1 })
                    .then(data => {
                        if (data.result) {
                            product.quantity--;
                        }
                    })
            } else {
                this.$parent.deleteJson(`/deleteProduct/${product.id_product}`);
                this.cartItems.splice(this.cartItems.indexOf(product), 1);
            }
        },
    },
    mounted() {
        this.$parent.getJson(this.cartUrl)
            .then(data => {
                for (let el of data) {
                    this.cartItems.push(el);
                }
            });
    },
    template: `
<div class="cart-wrapper">
            <button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>
            <div class="cart-block" v-show="showCart">
                <p v-if="!cartItems.length">Cart is empty</p>
                <cart-item class="cart-item" 
                v-for="item of cartItems" 
                :key="item.id_product"
                :cart-item="item" 
                @remove="remove">
                </cart-item>
            </div>
</div>`
});
Vue.component('cart-item', {
    props: ['cartItem'],
    data() {
        return {
            urlImg: `img/${this.cartItem.id_product}.jpg`
        }
    },
    template: `
                <div class="cart-item">
                    <div class="product-bio">
                        <img class="img-cart-product" :src="urlImg" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">{{cartItem.product_name}}</p>
                            <p class="product-quantity">Quantity: {{cartItem.quantity}}</p>
                            <p class="product-single-price">$ {{cartItem.price}} each</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">{{cartItem.quantity*cartItem.price}}</p>
                        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                    </div>
                </div>
    `
});