const { cartsModel } = require('./models/carts.model.js');

class CartsMongo {

    create = async (carts) => {
        let newCart = cartsModel(carts);
        const savedCart = await newCart.save();
        return savedCart;
    }

    addCart = async (cartId, newProduct) => {
        const cart = await cartsModel.findById(cartId);
        if (!cart) { return "Carrito no encontrado" }
        const beforeInsertNewProduct = {
            productId: newProduct.productId,
            quantity: newProduct.quantity
        } 
        cart.products = [...cart.products, beforeInsertNewProduct];
        await cart.save();
        return "Carrito actualizado con nuevos productos";  
    }

    get = async () => {
        let cartsData = await cartsModel.find();
        return cartsData;
    }

    getById = async (id) => {
        let cid = id;
        let cartsById = await cartsModel.findById(cid);
        if (!cartsById) {
            return "El ID no existe";
        } else {
            return cartsById;
        }
    }

    updateProductInCart = async (prodId, cartId, newQuantity) => {
        const carts = await cartsModel.findById(cartId);
        if (!carts) { return "Carrito no encontrado" };
        const productToUpdate = carts.products.find((product) => product._id == prodId);
        console.log(productToUpdate);
        if (!productToUpdate) { return "Producto no encontrado en el carrito" };
        productToUpdate.quantity = newQuantity.quantity;
        await carts.save();
        return "Cantidad actualizada con exito";
    }

    deleteProduct = async (prodId, cartId) => {
        const carts = await cartsModel.findById(cartId);
        if (!carts) { return "Carrito no encontrado" };
        const updateCart = carts.products.filter(product => product._id != prodId);
        carts.products = updateCart;
        await carts.save();
        return "Producto eliminado exitosamente";
    }

    deleteAllProducts = async (cartId) => {
        const carts = await cartsModel.findById(cartId);
        if (!carts) { return "Carrito no encontrado" };
        carts.products = [];
        await carts.save();
        return "Todos los productos han sido eliminados del carrito";
    }

}

module.exports = { CartsMongo }