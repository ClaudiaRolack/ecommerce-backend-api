const { Products } = require('../dao/factory.js');
const ProductsRepository = require('./products.repository.js');

const productsService = new ProductsRepository(new Products());

module.exports = { productsService };