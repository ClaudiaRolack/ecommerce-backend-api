class ProductsRepository {
    constructor(dao) {
        this.dao = dao
    }

    create = async (productData) => {
        let product = await this.dao.create(productData);
        return product;
    }

    get = async () => {
        let products = await this.dao.get();
        return products;
    }

    getById = async (id) => {
        let productById = await this.dao.getById(id);
        return productById;
    }

    update = async (id, productData) => {
        let pid = id;
        let updatedProduct = await this.dao.update(pid, productData)
        return updatedProduct;
    }

    delete = async (id) => {
        let product = await this.dao.delete(id);
        return product;
    }

};

module.exports = { ProductsRepository }