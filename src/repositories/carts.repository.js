class CartsRepository {
    constructor(dao) {
        this.dao = dao
    }

    create = async (carts) => {
        let newCarts = await this.dao.create(carts);
        return newCarts;
    }

    addCart = async (cartId, newProduct) => {
        let addCart = await this.dao.addCart(cartId, newProduct);
        return addCart;
    }


    get = async () => {
        let carts = await this.dao.get();
        return carts;
    }

    getById = async (id) => {
        let cartsById = await this.dao.getById(id);
        return cartsById;
    }

    updateProductInCart = async (prodId, cartId, newQuantity) => {
        let updatedQuantity = await this.dao.updateProductInCart(prodId, cartId, newQuantity);
        return updatedQuantity;
    }

    deleteProduct = async (prodId, cartId) => {
        let deleteProduct = await this.dao.deleteProduct(prodId, cartId);
        return deleteProduct;
    }

    deleteAllProducts = async (cartId) => {
        console.log(cartId)
        let deleteAll = await this.dao.deleteAllProducts(cartId);
        return deleteAll;
    }

};

module.exports = { CartsRepository }