const ProductsDTO = require('../dao/DTOs/products.dto.js');

class ProductsRepository {
    constructor(dao) {
        this.dao = dao
    }

    create = async (title, description, category, price, code, stock, availability) => {
        try {
            let productData = { title, description, category, price, code, stock, availability };
            let productToInsert = new ProductsDTO(productData);
            let result = await this.dao.create(productToInsert);
            return result;
        } catch (error) {
            console.error('Error al crear el producto:', error);
            throw error;
        }
    }

};

module.exports = { ProductsRepository };