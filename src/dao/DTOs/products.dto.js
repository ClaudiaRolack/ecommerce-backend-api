class Product {
    constructor(productData, id) {
        this.title = productData.title;
        this.description = productData.description;
        this.category = productData.category;
        this.price = productData.price;
        this.code = productData.code;
        this.stock = productData.stock;
        this.availability = productData.availability;
        this.status = true;
        this._id = id
    };
};

module.exports = { Product };