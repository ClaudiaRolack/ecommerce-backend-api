const { Router } = require('express');

const { ProductsDTO } = require('../dao/DTOs/products.dto.js');
const { productsService } = require('../repositories/index.js');
const { passportCall } = require('../auth/passport.config.js');
const { authorizationMiddleware } = require('../auth/authMiddleware.js');

const router = Router();

router.post('/', passportCall('jwt'), authorizationMiddleware(['admin']), async (req, res) => {
    try {
        let { title, description, category, price, code, stock, availability } = req.body;
        let productData = { title, description, category, price, code, stock, availability };
        let product = new ProductsDTO(productData);

        let result = await productsService.create(product);
        return res.status(201).json({ result: 'success', payload: result });
    } catch (error) {
        console.error('Error al crear producto:', error);
        return res.status(500).json({ result: 'error', error: error.message });
    }
})

router.get('/', async (req, res) => {
    let result = await productsService.get();
    res.send({ status: 'success', payload: result });
})

router.get('/:pid', async (req, res) => {
    let { pid } = req.params;
    res.send(await productsService.getById(pid));
})

router.put('/:pid', passportCall('jwt'), authorizationMiddleware(['admin']), async (req, res) => {
    let { pid } = req.params;
    let productsToReplace = req.body;
    if (!productsToReplace.title || !productsToReplace.description || !productsToReplace.category || !productsToReplace.price || !productsToReplace.code || !productsToReplace.stock || !productsToReplace.availability) {
        res.send({ status: "error", error: "No hay datos en parametros" });
    } else {
        let result = await productsService.update({ _id: pid }, productsToReplace);
        res.send({ result: 'success', payload: result });
    }
})

router.delete('/:pid', passportCall('jwt'), authorizationMiddleware(['admin']), async (req, res) => {
    let { pid } = req.params;
    let result = await productsService.delete(pid);
    res.send({ result: 'success', payload: result });
})

module.exports = router