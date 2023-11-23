const { Products, Carts } = require('../dao/factory.js');
const { ProductsRepository } = require('./products.repository.js');
const { CartsRepository } = require('./carts.repository.js');

const productsService = new ProductsRepository(new Products());

const cartsService = new CartsRepository(new Carts());

module.exports = { productsService, cartsService };