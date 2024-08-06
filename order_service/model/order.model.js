const {Schema, model} = require('mongoose');

const orderSchema = new Schema({
    products : [{_id: String}],
    email: String,
    totalPrice : Number
},{timestamps: true});

const orderModel = new model('Orders', orderSchema);

module.exports = orderModel;