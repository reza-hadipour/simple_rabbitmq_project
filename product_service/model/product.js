const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    name: String,
    price: Number
},{timestamps: false});

const productModel = new model('Products',productSchema);

module.exports = productModel;