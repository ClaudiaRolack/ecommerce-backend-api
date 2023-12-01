const { Products, Carts, Users, Orders } = require('../dao/factory.js');
const { ProductsRepository } = require('./products.repository.js');
const { CartsRepository } = require('./carts.repository.js');
const { UsersRepository } = require('./users.repository.js');
const { OrdersRepository } = require('./orders.repository.js');

const productsService = new ProductsRepository(new Products());

const cartsService = new CartsRepository(new Carts());

const usersService = new UsersRepository( new Users());

const ordersService = new OrdersRepository(new Orders());

module.exports = { productsService, cartsService, usersService, ordersService };