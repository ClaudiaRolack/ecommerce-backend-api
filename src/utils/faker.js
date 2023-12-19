const { faker } = require('@faker-js/faker');

faker.location = "es";

const generateProducts = () => {
    let numOfProducts = 100;
    let products = [];
    for (let i = 0; i < numOfProducts; i++) {
        products.push(generateProduct());
    }
    return products;
};

const generateProduct = () => {
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        category: faker.commerce.department(),
        price: faker.commerce.price(),
        code: faker.string.uuid(),
    };
};

module.exports = { generateProducts };