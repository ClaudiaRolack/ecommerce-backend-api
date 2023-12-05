const { cartsModel } = require('./models/carts.model.js');

class CartsMongo {

    create = async (carts) => {
        try {
            let newCart = await cartsModel(carts);
            const savedCart = await newCart.save();
            return savedCart;
        } catch (error) {
            console.log(error)
            return null
        }
    }

    addCart = async (cartId, newProduct) => {
        try {
            const cart = await cartsModel.findById(cartId);
            if (!cart) { return 'Carrito no encontrado' }
            const beforeInsertNewProduct = {
                productId: newProduct.productId,
                quantity: newProduct.quantity
            }
            cart.products = [...cart.products, beforeInsertNewProduct];
            await cart.save();
            return 'Carrito actualizado con nuevos productos';
        } catch (error) {
            console.log(error)
            return null
        }
    }

    get = async () => {
        try {
            let cartsData = await cartsModel.find();
            return cartsData;
        } catch (error) {
            console.log(error)
            return null
        }
    }

    getById = async (id) => {
        try {
            let cid = id;
            let cartsById = await cartsModel.findById(cid);
            if (!cartsById) {
                return 'El ID no existe';
            } else {
                return cartsById;
            }
        } catch (error) {
            console.log(error)
            return null
        }
    }

    updateProductInCart = async (prodId, cartId, newQuantity) => {
        try {
            const carts = await cartsModel.findById(cartId);
            if (!carts) { return 'Carrito no encontrado' };
            const productToUpdate = carts.products.find((product) => product._id == prodId);
            if (!productToUpdate) { return 'Producto no encontrado en el carrito' };
            productToUpdate.quantity = newQuantity.quantity;
            await carts.save();
            return 'Cantidad actualizada con exito';
        } catch (error) {
            console.log(error)
            return null
        }
    }

    deleteProduct = async (prodId, cartId) => {
        try {
            const carts = await cartsModel.findById(cartId);
            if (!carts) { return 'Carrito no encontrado' };
            const updateCart = carts.products.filter(product => product._id != prodId);
            carts.products = updateCart;
            await carts.save();
            return 'Producto eliminado exitosamente';
        } catch (error) {
            console.log(error)
            return null
        }
    }

    deleteAllProducts = async (cartId) => {
        try {
            const carts = await cartsModel.findById(cartId);
            if (!carts) { return 'Carrito no encontrado' };
            carts.products = [];
            await carts.save();
            return 'Todos los productos han sido eliminados del carrito';
        } catch (error) {
            console.log(error)
            return null
        }
    }

}

module.exports = { CartsMongo }