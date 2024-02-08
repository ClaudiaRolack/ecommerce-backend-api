const { Router } = require('express');
const { ordersService } = require('../repositories/index.js');
const { cartsService } = require('../repositories/index.js');


const router = Router();

router.get("/", async (req, res) => {
    let orderData = await ordersService.getOrder()
    res.send({ result: 'success', payload: orderData });
})

router.get("/:oid", async (req, res) => {
    let { oid } = req.params;
    res.send(await ordersService.getOrderById(oid));
})

router.get('/view/:cartId', async (req, res) => {
    try {
        const cartId = req.params.cartId;
        let purchaseData = await cartsService.getById(cartId)
        res.render('viewPurchase', { purchaseData })
    } catch (error) {
        console.error('Error al traer el carrito por ID:', error);
        res.status(500).send({ success: false, error: 'Error al traer la compra' });
    }
});

module.exports = router