const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://mongo:27017/product-db', { useNewUrlParser: true, useUnifiedTopology: true });

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    stock: Number,
    version: { type: Number, default: 0 }
});

const Product = mongoose.model('Product', ProductSchema);

app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

app.post('/products', async (req, res) => {
    const { name, price, stock } = req.body;
    const product = new Product({ name, price, stock });
    await product.save();
    res.status(201).send(product);
});

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price, stock, version } = req.body;
    const product = await Product.findOne({ _id: id, version });
    if (!product) return res.status(409).send('Conflict');

    product.name = name;
    product.price = price;
    product.stock = stock;
    product.version += 1;
    await product.save();
    res.send(product);
});

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.send('Product deleted');
});

app.listen(3001, () => {
    console.log('Product Management Service running on port 3001');
});
