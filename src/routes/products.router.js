const { Router } = require('express');
const { ProductsDTO } = require('../dao/DTOs/products.dto.js');
const { productsService } = require('../repositories/index.js');
const { usersService } = require('../repositories/index.js');
const { passportCall } = require('../auth/passport.config.js');
const { authorizationMiddleware } = require('../auth/authMiddleware.js');
const { CustomError } = require('../services/errors/customError.js');
const { generateProductErrorInfo } = require('../services/errors/info.js');
const { EErrors } = require('../services/errors/enums.js');


const router = Router();

router.post('/', passportCall('jwt'), authorizationMiddleware(['admin', 'premium']), async (req, res) => {
    try {
        let { title, description, category, price, code, stock, availability } = req.body;

        if (!title || !description || !category || !price || !code || !stock || !availability) {
            CustomError.createError({
                name: 'Product creation error',
                cause: generateProductErrorInfo({ title, description, category, price, code, stock, availability }),
                message: 'Error trying to create product',
                code: EErrors.INVALID_TYPES_ERROR
            })
        }

        let productData = { title, description, category, price, code, stock, availability, owner: req.user.email };
        let product = new ProductsDTO(productData);

        let result = await productsService.create(product, req.user);
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

router.delete('/:productId', passportCall('jwt'), authorizationMiddleware(['admin', 'premium']), async (req, res) => {
    try {
        const { productId: pid } = req.params;
        const user = await usersService.getUserByEmail(req.user.email);

        if (user.rol === 'premium') {
            const product = await productsService.getById(pid);

            if (!product) {
                return res.status(404).json({ result: 'error', error: 'Producto no encontrado.' });
            }

            if (product.owner !== user.email) {
                return res.status(403).json({ result: 'error', error: 'No tienes permisos para eliminar este producto.' });
            }
        }

        const result = await productsService.delete(pid);
        return res.status(200).json({ result: 'success', payload: result });

    } catch (error) {
        console.error('Error al eliminar producto:', error);
        return res.status(500).json({ result: 'error', error: error.message });
    }
});

module.exports = router