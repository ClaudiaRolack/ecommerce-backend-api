const { productsModel } = require('./models/products.model.js');
const { usersModel } = require('./models/users.model.js');

class ProductsMongo {

    create = async (productData, user) => {
        try {
            this.validateProductData(productData);

            if (!productData.owner) {
                productData.owner = 'admin';
            }

            if (user && user.rol === 'premium') {
                productData.owner = user.email;
            } else {
                return null;
            }

            const newProduct = await productsModel.create(productData);
            return newProduct;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    get = async () => {
        try {
            let products = await productsModel.find();
            return products;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    getById = async (id) => {
        try {
            let pid = id
            let productById = await productsModel.findById(pid);
            if (!productById) {
                return 'El ID no existe';
            } else {
                return productById;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    update = async (id, productData) => {
        try {
            let pid = id;
            let existingProduct = await productsModel.findById(pid);
            if (!existingProduct) { return 'Producto no encontrado' };
            existingProduct.set(productData);
            await existingProduct.save();
            return 'Producto actualizado';
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    delete = async (id) => {
        try {
            let pid = id;
            const result = await productsModel.findOneAndDelete({ _id: pid });

            if (result) {
                console.log('Producto eliminado:', result);
                return 'Producto eliminado';
            } else {
                console.log('Producto no encontrado');
                return 'Producto no encontrado';
            }
            
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    validateProductData = async (productData) => {
        try {
            if (!productData.title || !productData.description || !productData.category || !productData.price || !productData.code || !productData.stock || !productData.availability) {
                throw new Error('Faltan datos obligatorios');
            }
            if (productData.stock === undefined) { productData.stock = 0 }
            if (productData.availability !== 'inStock' && productData.availability !== 'outOfStock') {
                throw new Error('El valor de disponibilidad es inválido')
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }

}

module.exports = { ProductsMongo }