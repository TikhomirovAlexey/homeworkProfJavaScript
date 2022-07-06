const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];//массив товаров из JSON документа
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = data;
                //                 console.log(data);
                this.render()
            });
    }
    // _fetchProducts(cb){
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.goods = JSON.parse(data);
    //         console.log(this.goods);
    //         cb();
    //     })
    // }
    _getProducts() {

        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });

    }
    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            //            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}


class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

class CardList {
    constructor(btnCart = '.btn-cart', goodsCartBlock = '.goodsCart', delCartItem = '.card-block', addCartItem = '.buy-btn') {
        this.btnCart = btnCart;
        this.goodsCartBlock = goodsCartBlock;
        this.goodsCart = [];
        this.delCartItem = delCartItem;
        this.addCartItem = addCartItem;
        this._getProducts()
            .then(data => {
                this.goodsCart = data.contents;
                console.log(this.goodsCart);
                this.renderCart()
                this.showList();
                this.clickListener();
            });
    }

    _getProducts() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });

    }
    /**
     * метод показывает и скрывает список элементов, добавленных в корзину
     */
    showList() {
        document.querySelector(this.btnCart).addEventListener('click', () => {
            let block = document.querySelector(this.goodsCartBlock);
            if (block.style.display == 'block') {
                block.style.display = 'none';
            } else {
                block.style.display = 'block';
            }
        });
    }
    /**
     * метод рендерит разметку добавленных карточек товара в список корзины
     */
    renderCart() {
        console.log(this.goodsCart);
        let block = document.querySelector(this.goodsCartBlock);
        for (let product of this.goodsCart) {
            product.sum = product.price * product.quantity;
            if (product.quantity > 0) {
                const cardItem = new CardItem(product, this.sum);
                block.insertAdjacentHTML('beforeend', cardItem.render());
            }
        }

    }
    /**
     * метод чистит корзину товаров
     */
    clearCart() {
        let block = document.querySelector(this.goodsCartBlock);
        block.textContent = '';
    }
    /**
     * метод добавляет слушатель события на кнопки удалить и добавить
     */
    clickListener() {
        document.querySelector(this.delCartItem).addEventListener('click', (event) => {
            if (event.target.classList.contains('delete')) {
                this.deleteItem(event);
            }
            console.log(event.target);
        });

        document.querySelectorAll(this.addCartItem).forEach(btn => {
            btn.addEventListener('click', (event) => {
                this.addItem(event);
            });
        });
    }
    /**
    * метод добавляет товар в корзину
    */
    addItem(event) {
        for (let product of this.goodsCart) {
            if (event.target.parentNode.querySelector('h3').textContent === product.product_name) {
                product.quantity++;
            }
        }
        this.clearCart();
        this.renderCart();
    }
    /**
     * метод удаляет или уменьшает товар из корзины
     */
    deleteItem(event) {
        for (let product of this.goodsCart) {
            if (event.target.parentNode.querySelector('h3').textContent === product.product_name) {
                product.quantity--;
            }
        }
        this.clearCart();
        this.renderCart();
    }

}

class CardItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.sum = product.sum;
        this.img = img;
        this.quantity = product.quantity;
    }

    /**
     * метод рендерит разметку добавленной карточки товара
     */
    render() {
        return `<div class="product-item product-item-cart" data-id="${this.id}">
        <img class="img-cart" src="${this.img}" alt="Some img">
        <div class="desc desc-cart">
            <h3>${this.title}</h3>
            <p>${this.sum} $</p>
            <p>quantity:${this.quantity}</p>
            <button class="delete">delete</button>
        </div>
    </div>`
    }

}

let list = new ProductsList();
let listGoodsCard = new CardList();
// console.log(list.allProducts);

