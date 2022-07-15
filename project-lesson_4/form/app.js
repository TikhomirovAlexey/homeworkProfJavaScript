'use strict';

let form = document.querySelector('form');

form.addEventListener('submit', event => {
    event.preventDefault();
    //валидация имени
    if (!(/^[a-z]|[а-я]+$/i.test(document.getElementById('name').value))) {
        document.getElementById('name').classList.add('error');//добавляем класс ошибка с красной рамкой
        if (!document.querySelector('p[id="pName"]')) { //проверяем есть ли уже параграф с текстом ошибки, если нет, то создать.
            document.getElementById('name').parentNode.insertAdjacentHTML('afterend', '<p id="pName">Нужно ввести имя, содержащее только буквы!</p>')
        }
    } else if (/^[a-z]|[а-я]+$/i.test(document.getElementById('name').value)) {//если исправили ошибку удаляем класс error и параграф с текстом ошибки
        if (document.getElementById('name').classList.contains('error')) {
            document.getElementById('name').classList.remove('error')
        }
        document.querySelector('p[id="pName"]')?.remove();
    }
    //валидация телефона
    if (!(/^\+\d{1}\(\d{3}\)\d{3}-\d{4}$/.test(document.getElementById('phone').value))) {
        document.getElementById('phone').classList.add('error');
        if (!document.querySelector('p[id="pPhone"]')) {
            document.getElementById('phone').parentNode.insertAdjacentHTML('afterend', '<p id="pPhone">Нужно ввести телефон вида +7(000)000-0000!</p>')
        }
    } else if (/^\+\d{1}\(\d{3}\)\d{3}-\d{4}$/.test(document.getElementById('phone').value)) {
        if (document.getElementById('phone').classList.contains('error')) {
            document.getElementById('phone').classList.remove('error')
        }
        document.querySelector('p[id="pPhone"]')?.remove();
    }
    //валидация почты
    if (!(/^([\w-\.]+)@([\w-\.]+)\.([a-zA-z\.]{2,6})$/.test(document.getElementById('mail').value))) {
        document.getElementById('mail').classList.add('error');
        if (!document.querySelector('p[id="pMail"]')) {
            document.getElementById('mail').parentNode.insertAdjacentHTML('afterend', '<p id="pMail">Нужно ввести почту вида mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru!</p>');
        }

    } else if (/^[a-z]|[а-я]+$/i.test(document.getElementById('mail').value)) {
        if (document.getElementById('mail').classList.contains('error')) {
            document.getElementById('mail').classList.remove('error')
        }
        document.querySelector('p[id="pMail"]')?.remove();
    }


})