const products = [
    { id: 1, title: 'Notebook', price: 2000 },
    { id: 2, title: 'Mouse', price: 20 },
    { id: 3, title: 'Keyboard', price: 200 },
    { id: 4, title: 'Gamepad', price: 50 },
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = ({ id, title, price }, img = "img/image.jpg") => {
    return `<div class="product-item">
                <h3 class="card-heading">${title}</h3>
                <img src="${img}" alt="img">
                <p class="card-price">${price}</p>
                <button class="buy-btn btn-cart">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList.join(''); //Так как мы рендерим массив, вылезает запятая. метод join('') превращает массив в строку, с нужным разделителем. В данном случае разделитель убираем совсем.
};

renderPage(products);