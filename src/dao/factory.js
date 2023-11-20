const mongoose = require('mongoose');
const config = require('../config/config.js');

let Products
switch (config.persistence) {
    case "MONGO":
        const connection = mongoose.connect(MONGO_URL);
        const { default: ProductsMongo } = await import('../config/config.js');
        Products = ProductsMongo;
        break;
    case "MEMORY":
        const { default: ContactMemory } = await import("./memory/contact.memory.js");
        Contact = ContactMemory;
        break

    default:
};

module.exports = { Products };