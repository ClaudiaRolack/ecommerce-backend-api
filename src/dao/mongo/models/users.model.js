const mongoose = require('mongoose');

const usersCollection = 'users';

const usersSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    age: Number,
    password: String,
    rol: { type: String, enum: ['user', 'premium', 'admin'], default: 'user' },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'carts' },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'orders' }],
    documents: [{ name: String, reference: String }],
    last_connection: Date
});

usersSchema.methods.updateLastConnection = function() {
    this.last_connection = new Date();
  };

const usersModel = mongoose.model(usersCollection, usersSchema);

module.exports = { usersModel }