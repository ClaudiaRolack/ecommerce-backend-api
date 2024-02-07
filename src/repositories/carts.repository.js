class CartsRepository {
    constructor(dao) {
        this.dao = dao
    }

    create = async (carts) => {
        let newCarts = await this.dao.create(carts);
        return newCarts;
    }

    addCart = async (cartId, productId, quantity) => {
        let addCart = await this.dao.addCart(cartId, productId, quantity);
        return addCart;
    }


    get = async () => {
        let carts = await this.dao.get();
        return carts;
    }

    findCartItem = async (cartId, productId) => {
        let carts = await this.dao.findCartItem(cartId, productId);
        return carts;
    }

    getById = async (id) => {
        let cartsById = await this.dao.getById(id);
        return cartsById;
    }

    updateProductInCart = async (productId, cartId, newQuantity) => {
        let updatedQuantity = await this.dao.updateProductInCart(productId, cartId, newQuantity);
        return updatedQuantity;
    }

    deleteProduct = async (productId, cartId) => {
        let deleteProduct = await this.dao.deleteProduct(productId, cartId);
        return deleteProduct;
    }

    deleteAllProducts = async (cartId) => {
        console.log(cartId)
        let deleteAll = await this.dao.deleteAllProducts(cartId);
        return deleteAll;
    }

};

module.exports = { CartsRepository }