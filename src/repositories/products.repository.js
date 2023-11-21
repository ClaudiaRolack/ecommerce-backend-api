const { ProductsDTO } = require('../dao/DTOs/products.dto.js');

class ProductsRepository {
    constructor(dao) {
        this.dao = dao
    };

    create = async (productData) => {
        let productToInsert = new ProductsDTO(productData);
        let result = await this.dao.create(productToInsert);
        return result;
    };

    get = async () => {
        let products = await this.dao.get();
        return products;
    };

    getById = async (id) => {
        let pid = id
        let productById = await this.dao.getById(pid);
        if (!productById) {
            return "El ID no existe";
        } else {
            return productById;
        };
    };

    update = async (id, productData) => {
        let pid = id;
        let existingProduct = await this.dao.getById(pid);
        if (!existingProduct) { return "Producto no encontrado"; }
        let updatedProduct = Object.assign({}, existingProduct, productData);
        await this.dao.update(pid, updatedProduct);
        return "Producto actualizado";
    };

    delete = async (id) => {
        let pid = id;
        let product = await this.dao.getById(pid);
        if (product) await this.dao.delete(id);
        return "Producto Eliminado";
    };

};

module.exports = { ProductsRepository };