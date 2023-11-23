const { Router } = require('express');
const { cartsService } = require('../repositories/index.js');

const router = Router();

router.post("/", async (req, res) => {
    let product= req.body;
    res.send(await cartsService.create(product));
})

router.get("/", async (req, res) => {
    let cartsData = await cartsService.get()
    res.send({ result: "success", payload: cartsData });
})

router.get("/:cid", async (req, res) => {
    let { cid } = req.params;
    res.send(await cartsService.getById(cid));
})

router.put("/:cid", async (req, res) => {
    let cartId = req.params.cid;
    let newProduct = req.body;
    res.send(await cartsService.addCart(cartId, newProduct));
})

router.put("/:cid/products/:pid", async (req, res) => {
    let prodId = req.params.pid;
    let cartId = req.params.cid;
    let newQuantity = req.body;
    res.send(await cartsService.updateProductInCart(prodId, cartId, newQuantity));
})

router.delete("/:cid/products/:pid", async (req, res) => {
    let prodId = req.params.pid;
    let cartId = req.params.cid;
    res.send(await cartsService.deleteProduct(prodId, cartId));
})

router.delete("/:cid", async (req, res) => {
    let cartId = req.params.cid;
    res.send(await cartsService.deleteAllProducts(cartId));
})

module.exports = router