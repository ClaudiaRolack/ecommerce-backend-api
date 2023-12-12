const { Router } = require('express');
const { cartsService, ordersService, productsService } = require('../repositories/index.js');
const { passportCall } = require('../auth/passport.config.js');
const { authorizationMiddleware } = require('../auth/authMiddleware.js');
const { generateOrderCode } = require('../helpers/generateCode.js');

const router = Router();

router.post('/', async (req, res) => {
    try {
        let carts = req.body;
        const result = await cartsService.create(carts);
        res.send(result);
    } catch (error) {
        console.error('Error al intentar crear el carrito:', error);
        res.status(500).send({ success: false, error: 'Error al crear el carrito' });
    }
})

router.post('/:cid/purchase', async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await cartsService.getById(cid);

        const productsNotProcessed = [];
        const orderDetails = [];
        let orderTotalAmount = 0;

        for (const product of cart.products) {
            const productData = await productsService.getById(product.productId);

            if (productData && productData.stock >= product.quantity) {
                productData.stock -= product.quantity;

                const productAmount = product.quantity * productData.price;
                orderTotalAmount += productAmount;

                orderDetails.push({
                    productId: product.productId,
                    title: productData.title,
                    quantity: product.quantity,
                    amount: productAmount,
                });

                await productData.save();
            } else {
                productsNotProcessed.push(product.productId);
            }
        }

        if (orderDetails.length > 0) {
            const orderCode = generateOrderCode();

            const order = await ordersService.createOrder({
                cartId: cid,
                cart: cart,
                details: orderDetails,
                amount: orderTotalAmount,
                code: orderCode,
            });

            await order.save();
        }

        cart.products = cart.products.filter(product => !productsNotProcessed.includes(product.productId));
        await cart.save();

        res.send({ success: true, productsNotProcessed, orderDetails });
    } catch (error) {
        console.error('Error al procesar la compra:', error);
        res.status(500).send({ success: false, error: 'Error al procesar la compra' });
    }
});

router.post('/', async (req, res) => {
    try {
        let carts = req.body;
        const result = await cartsService.create(carts);
        res.send(result);
    } catch (error) {
        console.error('Error al intentar crear el carrito:', error);
        res.status(500).send({ success: false, error: 'Error al crear el carrito' });
    }
})

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