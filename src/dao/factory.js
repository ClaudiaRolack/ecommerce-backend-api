const config = require('../config/config.js');
const { connectToDatabase } = require('../config/database.js');

let Products 
switch (config.persistence) {
    case "MONGO":
        connectToDatabase;
        const { default: ProductsMongo } = require('./mongo/models/products.model.js');
        Products = ProductsMongo;
        break;
    case "MEMORY":
        const { default: ProductsMemory } = require("./memory/products.memory.js");
        Products = ProductsMemory;
        break;

    default:
};


module.exports = { Products };