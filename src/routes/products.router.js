const { Router } = require('express');
const productsDTO = require('../dao/DTOs/products.dto.js');
const { ProductsService } = require('../repositories/index.js');

const router = Router();

router.post("/", async (req, res) => {
    let { title, description, category, price, code, stock, availability } = req.body;

    let product = new productsDTO({ title, description, category, price, code, stock, availability });
    let result = await ProductsService.create(product);
    return result;
});

module.exports = router