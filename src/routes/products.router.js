const { Router } = require('express');
const productsDTO = require('../dao/DTOs/products.dto.js');
const { ProductsService } = require('../repositories/index.js');

const router = Router();

router.post("/", async (req, res) => {
    try {
        let { title, description, category, price, code, stock, availability } = req.body;

        if (!title || !description || !category || !price || !code || !stock || !availability) {
            return res.status(400).json({ status: "error", error: "Faltan datos obligatorios" });
        }

        if (stock === undefined) { stock = 0; }

        if (availability !== "inStock" && availability !== "outOfStock") {
            return res.status(400).json({ status: "error", error: "El valor de disponibilidad es inválido" });
        }

        const result = await productsDTO.create({ title, description, category, price, code, stock, availability });
        return res.status(201).json({ result: "success", payload: result });
    } catch (error) {
        return res.status(500).json({ status: "error", error: error.message });
    }
});