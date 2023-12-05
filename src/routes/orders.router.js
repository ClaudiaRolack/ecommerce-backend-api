const { Router } = require('express');

const { ordersService } = require('../repositories/index.js');

const router = Router();

router.get("/", async (req, res) => {
    let orderData = await ordersService.getOrder()
    res.send({ result: 'success', payload: orderData });
})

router.get("/:oid", async (req, res) => {
    let { oid } = req.params;
    res.send(await ordersService.getOrderById(oid));
})

module.exports = router