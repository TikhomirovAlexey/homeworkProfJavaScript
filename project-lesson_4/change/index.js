'use strict'

let text = document.querySelector('p');
const textContent = text.innerHTML;

text.addEventListener('click', (event) => {
    text.innerHTML = textContent;
    if (event.target.id == 'one') {
        text.innerHTML = text.innerHTML.replace(/'/g, '"');
    }
    if (event.target.id == 'two') {
        text.innerHTML = text.innerHTML.replace(/\B'/g, '"');
    }
});
