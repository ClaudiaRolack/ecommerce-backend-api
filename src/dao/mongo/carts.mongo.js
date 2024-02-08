const { cartsModel } = require('./models/carts.model.js');
const { productsModel } = require('./models/products.model.js');

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

    addCart = async (cartId, productId, quantity) => {
        try {
            const carts = await this.getById(cartId);
    
            if (!carts) return;

            const parsedQuantity = parseInt(quantity);
            
            if (!isNaN(parsedQuantity)) {
                const existingProductIndex = carts.products.findIndex(product => product.productId === productId);
                
                if (existingProductIndex !== -1) {
                    carts.products[existingProductIndex].quantity += parsedQuantity;
                } else {
                    carts.products.push({ productId, quantity: parsedQuantity });
                }

                await carts.save();
                return carts;
            } else {
                throw new Error('La cantidad no es un número entero válido');
            }
        } catch (error) {
            console.error('Error al agregar el producto al carrito:', error);
            throw new Error('Error al agregar el producto al carrito');
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

    findCartItem = async (cartId, productId) => {
        try {
            const cartItem = await cartsModel.findOne({ cart: cartId, product: productId });
            return cartItem;
        } catch (error) {
            console.error('Error al buscar el elemento del carrito:', error);
            throw new Error('Error al buscar el elemento del carrito');
        }
    }

    getById = async (id) => {
        try {
            let cartsById = await cartsModel.findById(id);
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

    updateProductInCart = async (productId, cartId, newQuantity) => {
        try {
            const cartItem = await cartsModel.findOneAndUpdate(
                { cart: cartId, product: productId },
                { quantity: newQuantity },
                { new: true }
            );
            return cartItem;
        } catch (error) {
            console.error('Error al actualizar la cantidad del producto en el carrito:', error);
            throw new Error('Error al actualizar la cantidad del producto en el carrito');
        }
    }

    deleteProduct = async (productId, cartId) => {
        try {
            const cart = await cartsModel.findById(cartId);
            if (!cart) { return 'Carrito no encontrado' };
            const updateCart = cart.products.filter(product => product.productId != productId);
            cart.products = updateCart;
            await cart.save();
        } catch (Error) {
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