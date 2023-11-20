const { productsModel } = require('./models/products.model.js');

class Products {
    constructor() {}

    create = async (product) => {
        const newProduct = await productsModel.create({product});
        const result =newProduct;
        return result
    } 

}

module.exports = { Products }