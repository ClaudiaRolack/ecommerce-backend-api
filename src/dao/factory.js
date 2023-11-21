const config = require('../config/config.js');
const { connectToDatabase } = require('../config/database.js');

let Products 
switch (config.persistence) {
    case "MONGO":
        connectToDatabase();
        const { ProductsMongo } = require('./mongo/products.mongo.js');
        Products = ProductsMongo;
        break;
    case "MEMORY":
        const { ProductsMemory } = require("./memory/products.memory.js");
        Products = ProductsMemory;
        break;

    default:
};


module.exports = { Products };