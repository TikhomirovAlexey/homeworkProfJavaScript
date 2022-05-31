'use strict';

class Hamburger {
    constructor(name, price, calories) {
        this.name = name;
        this.price = price;
        this.calories = calories;
    }
}

class AllComponents {
    constructor() {
        this.sum = 0;
        this.calories = 0;
        this.components = [];
    }

    collectComponent(name, price, calories) {
        let hamburger = new Hamburger(name, price, calories);
        this.components.push(hamburger);
    }

    showResults() {
        this.components.forEach(item => {
            this.sum += +(item.price);
            this.calories += +(item.calories);
        })
        document.querySelector('p').innerHTML = `Итого: цена - ${this.sum}, калории - ${this.calories}.`
    }
}





