const { Products } = require('../dao/factory.js');
const ProductsRepository = require('./products.repository.js');

export const productsService = new ProductsRepository(new Products());