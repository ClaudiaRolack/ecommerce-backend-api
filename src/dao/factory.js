const config = require('../config/config.js');
const { connectToDatabase } = require('../config/database.js');

let Products 
let Carts
let Users
let Orders
switch (config.persistence) {
    case "MONGO":
        connectToDatabase();
        const { ProductsMongo } = require('./mongo/products.mongo.js');
        const { CartsMongo } = require('./mongo/carts.mongo.js');
        const { UsersMongo } = require('./mongo/users.mongo.js');
        const { OrdersMongo } = require('./mongo/orders.mongo.js');
        Products = ProductsMongo;
        Carts = CartsMongo;
        Users = UsersMongo;
        Orders = OrdersMongo;
        break;
    case "MEMORY":
        const { ProductsMemory } = require('./memory/products.memory.js');
        const { CartsMemory } = require('./memory/carts.memory.js');
        const { UsersMemory } = require('./memory/users.memory.js');
        const { OrdersMemory } = require('./memory/orders.memory.js');
        Products = ProductsMemory;
        Carts = CartsMemory;
        Users = UsersMemory;
        Orders = OrdersMemory;
        break;

    default:
}

module.exports = { Products, Carts, Users, Orders }