const { productsModel } = require('./models/products.model.js');

class ProductsMongo {

    create = async (productData) => {
        const newProduct = await productsModel.create(productData);
        return newProduct;
    }; 

    get = async () => {
        let products = await productsModel.find();
        return products;
    };

    getById = async (id) => {
        let pid = id
        let productById = await productsModel.findById(pid);
        if (!productById) {
            return "El ID no existe";
        } else {
            return productById;
        };
    };

    update = async (id, productData) => {
        let pid = id;
        let existingProduct = await productsModel.findById(pid);
        if (!existingProduct) { return "Producto no encontrado"; }
        existingProduct.set(productData);
        await existingProduct.save();
        return "Producto actualizado";
    };

    delete = async (id) => {
        let pid = id;
        let product = await productsModel.findById(pid);
        if (product) {
            await product.deleteOne({ _id: pid });
            return "Producto eliminado";
          } else {
            return "Producto no encontrado";
          };
    };

};

module.exports = { ProductsMongo };