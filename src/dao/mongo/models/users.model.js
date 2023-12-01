const mongoose = require('mongoose');

const userCollection = 'users';

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    age: Number,
    password: String,
    rol: String,
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'carts' },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'orders' }]

});

const usersModel = mongoose.model(userCollection, userSchema);

module.exports = { usersModel }