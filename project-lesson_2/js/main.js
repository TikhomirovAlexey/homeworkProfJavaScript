class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.priceAllProducts = 0;
        this._fetchProducts();
        this.render();//вывод товаров на страницу
        this.priceAll();
    }
    /**
     * Метод переписывает пустой массив на массив объектов товаров
     */
    _fetchProducts() {
        this.goods = [
            { id: 1, title: 'Notebook', price: 2000 },
            { id: 2, title: 'Mouse', price: 20 },
            { id: 3, title: 'Keyboard', price: 200 },
            { id: 4, title: 'Gamepad', price: 50 },
        ];
    }
    /**
     * Метод берет массив объектов товаров, перебирает и рендерит разметку на страницу, предварительно создав ее в классе ProductItem
     */
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend", item.render());
            //           block.innerHTML += item.render();
        }
    }
    /**
     * метод считает общую стоимость всех товаров
     */
    priceAll() {
        this.goods.forEach(product => this.priceAllProducts += product.price);
        console.log(`общаяя стоимость продуктов - ${this.priceAllProducts}`);
    }
}

class ProductItem {
    constructor(product, img = 'img/image.jpg') {
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
    }
    /**
     * метод возвращает карточку товара в виде разметки HTML
     * @returns возвращает карточку товара в виде разметки HTML
     */
    render() {
        return `<div class="product-item">
                <img class='img' src="${this.img}">
                <h3 class='card-heading'>${this.title}</h3>
                <p class='card-price'>${this.price}</p>
                <button class="btn product-item__btn">Купить</button>
            </div>`
    }
}

class CardList {

    /**
     * метод показывает и скрывает список элементов, добавленных в корзину
     */
    showList() {

    }
    /**
     * метод рендерит разметку добавленных карточек товара в список корзины
     */
    render() {

    }
    /**
     * метод удаляет товар из козины
     */
    deleteItem() {

    }
}

class CardItem {

    /**
     * метод рендерит разметку добавленной карточки товара
     */
    render() {

    }
}

let list = new ProductList();



//const products = [
//    {id: 1, title: 'Notebook', price: 2000},
//    {id: 2, title: 'Mouse', price: 20},
//    {id: 3, title: 'Keyboard', price: 200},
//    {id: 4, title: 'Gamepad', price: 50},
//];
//
//const renderProduct = (product,img='https://placehold.it/200x150') => {
//    return `<div class="product-item">
//                <img src="${img}">
//                <h3>${product.title}</h3>
//                <p>${product.price}</p>
//                <button class="buy-btn">Купить</button>
//            </div>`
//};
//const renderPage = list => document.querySelector('.products').innerHTML = list.map(item => renderProduct(item)).join('');
//
//renderPage(products);