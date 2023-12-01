const { Router } = require('express');

const { cartsService, usersService, ordersService } = require('../repositories/index.js');
const { passportCall } = require('../auth/passport.config.js');
const { authorizationMiddleware } = require('../auth/authMiddleware.js');

const router = Router();

router.post('/', async (req, res) => {
    let product= req.body;
    res.send(await cartsService.create(product));
})

router.post('/:cid/purchase', passportCall('jwt'), authorizationMiddleware(['user']), async (req, res) => {
    const { cid } = req.params.cid;
    console.log(cid)
    const resultUser = await usersService.getUserById();
    const resultCarts = await cartsService.getById();
    let actualOrders = resultCarts.products.filter(product =>  product.includes(product.id))
    let sum = actualOrders.reduce((acc, prev) => {
        acc += prev.price
        return acc
    }, 0)
    let orderNumber = Date.now + Math.floor(Math.random()*10000+1)
    let order = {
        number: orderNumber,
        carts,
        user,
        status: "Pending",
        products: actualOrders.map(product => product.id),
        totalPrice: sum
    }
    let orderResult = await ordersService.createOrder(order)
    resultUser.orders.push(orderResult._id)
    await usersService.updateUser(user, resultUser)
    res.send({ status: 'success', result: 'orderResult' })
});

router.get('/', async (req, res) => {
    let cartsData = await cartsService.get()
    res.send({ result: 'success', payload: cartsData });
})

router.get('/:cid', async (req, res) => {
    let { cid } = req.params;
    res.send(await cartsService.getById(cid));
})

router.put('/:cid', passportCall('jwt'), authorizationMiddleware(['user']), async (req, res) => {
    let cartId = req.params.cid;
    let newProduct = req.body;
    res.send(await cartsService.addCart(cartId, newProduct));
})

router.put('/:cid/products/:pid', async (req, res) => {
    let prodId = req.params.pid;
    let cartId = req.params.cid;
    let newQuantity = req.body;
    res.send(await cartsService.updateProductInCart(prodId, cartId, newQuantity));
})

router.delete('/:cid/products/:pid', async (req, res) => {
    let prodId = req.params.pid;
    let cartId = req.params.cid;
    res.send(await cartsService.deleteProduct(prodId, cartId));
})

router.delete('/:cid', async (req, res) => {
    let cartId = req.params.cid;
    res.send(await cartsService.deleteAllProducts(cartId));
})

module.exports = router