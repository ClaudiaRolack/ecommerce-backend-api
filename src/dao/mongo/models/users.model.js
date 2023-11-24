const mongoose = require('mongoose');

const userCollection = 'users';

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    age: Number,
    password: String,
    rol: String,
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'carts' }
});

const usersModel = mongoose.model(userCollection, userSchema);

module.exports = { usersModel }