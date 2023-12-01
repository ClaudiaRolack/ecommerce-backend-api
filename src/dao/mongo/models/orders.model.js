const mongoose = require("mongoose");

const ordersCollection = "orders";

const ordersSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    purchase_datetime: { type: Date, default: Date.now },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'carts' },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true }
});

const ordersModel = mongoose.model(ordersCollection, ordersSchema);

module.exports = { ordersModel }