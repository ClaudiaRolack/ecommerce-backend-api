const config = require('../config/config.js');
const { connectToDatabase } = require('../config/database.js');

let Products 
let Carts
switch (config.persistence) {
    case "MONGO":
        connectToDatabase();
        const { ProductsMongo } = require('./mongo/products.mongo.js');
        const { CartsMongo } = require('./mongo/carts.mongo.js')
        Products = ProductsMongo;
        Carts = CartsMongo
        break;
    case "MEMORY":
        const { ProductsMemory } = require("./memory/products.memory.js");
        const { CartsMemory } = require('./memory/carts.memory.js')
        Products = ProductsMemory;
        Carts = CartsMemory
        break;

    default:
}

module.exports = { Products, Carts }