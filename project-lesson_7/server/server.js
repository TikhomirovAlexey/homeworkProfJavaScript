const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/', express.static('public'));
app.listen('5500', () => {
    console.log('Связь с сервером установлена!');
});

const urlProduct = 'server/json/getProducts.json';
const urlCartProduct = 'server/json/getCartProducts.json';


app.get('/getProducts', (req, res) => {
    fs.readFile(urlProduct, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
        }
    })
});

app.get('/getCartProducts', (req, res) => {
    fs.readFile(urlCartProduct, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
        }
    })
});

app.post('/postProduct', (req, res) => {
    fs.readFile(urlCartProduct, 'utf-8', (err, data) => {
        if (err) {
            res.send({
                result: 0,
                err,
            })
        } else {
            const cart = JSON.parse(data)
            cart.push(req.body)

            fs.writeFile(urlCartProduct, JSON.stringify(cart), "utf-8", (err, data) => {
                if (err) {
                    res.send({
                        result: 0,
                        err,
                    })
                } else res.send({ result: 1 })
            })
        }
    })
});

app.put('/putProduct/:id', (req, res) => {
    fs.readFile(urlCartProduct, 'utf-8', (err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            const cart = JSON.parse(data)
            const change = cart.find(good => {
                return good.id_product === +req.params.id
            })
            change.quantity += req.body.quantity

            fs.writeFile(urlCartProduct, JSON.stringify(cart), 'utf-8', (err, data) => {
                if (err) {
                    res.send({
                        result: 0,
                        err,
                    })
                }
                else res.send({
                    result: 1,
                })
            })
        }

    })
});

app.delete('/deleteProduct/:id', (req, res) => {
    fs.readFile(urlCartProduct, 'utf-8', (err, data) => {
        if (err) {
            res.send({
                result: 0,
                err,
            })
        }
        else {
            const cart = JSON.parse(data);
            let find = cart.find(el => el.id_product === +req.params.id);
            cart.splice(cart.indexOf(find), 1);

            fs.writeFile(urlCartProduct, JSON.stringify(cart), 'utf-8', (err, data) => {
                if (err) {
                    res.send({
                        result: 0,
                        err,
                    })
                }
                else res.send({
                    result: 1,
                })
            })
        }

    })
})