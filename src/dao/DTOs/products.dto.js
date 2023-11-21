class ProductsDTO {

    title;
    description;
    category;
    price;
    code;
    stock;
    availability;
    status;

    constructor(productData, id) {
        this.title = productData.title;
        this.description = productData.description;
        this.category = productData.category;
        this.price = productData.price;
        this.code = productData.code;
        this.stock = productData.stock;
        this.availability = productData.availability;
        this.status = true
    };
};

module.exports = { ProductsDTO };