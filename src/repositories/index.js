const { Products, Carts, Users } = require('../dao/factory.js');
const { ProductsRepository } = require('./products.repository.js');
const { CartsRepository } = require('./carts.repository.js');
const { UsersRepository } = require('./users.repository.js');

const productsService = new ProductsRepository(new Products());

const cartsService = new CartsRepository(new Carts());

const usersService = new UsersRepository( new Users());

module.exports = { productsService, cartsService, usersService };