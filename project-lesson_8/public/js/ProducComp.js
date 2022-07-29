Vue.component('products', {
    data() {
        return {
            catalogUrl: '/getProducts',
            products: [],
            filtered: [],
        }
    },
    methods: {
        filter(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted() {
        this.$parent.getJson(this.catalogUrl)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `
        <div class="products">
            <product v-for="item of filtered" :key="item.id_product" :product="item"></product>
        </div>
    `
});
Vue.component('product', {
    props: ['product'],
    data() {
        return {
            urlImg: `img/${this.product.id_product}.jpg`
        }
    },
    template: `
    <div class="product-item">
                <img :src="urlImg" alt="Some img">
                <div class="desc">
                    <h3>{{product.product_name}}</h3>
                    <p>{{product.price}} $</p>
                    <button class="buy-btn" @click="$parent.$parent.$refs.cart.addProduct(product)">Купить</button>
                </div>
            </div>
    `
})