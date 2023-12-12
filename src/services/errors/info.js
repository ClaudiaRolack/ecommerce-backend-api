const generateUserErrorInfo = (user) => {
    return `One or more properties were imcolplete or not valid.
    List of required properties:
    * firstName: needs to be a String, received ${user.first_name}
    * lastName: needs to be a String, received ${user.last_name}
    * email: needs to be a String, received ${user.mail}
    * age: needs to be a Number, received ${user.age},
    * rol: needs to be a String, received ${user.rol}`
}

const generateProductErrorInfo = (product) => {
    return `One or more properties were imcolplete or not valid.
    List of required properties:
    * title: needs to be a String, received ${product.title},
    * description: needs to be a String, received ${product.description},
    * category: needs to be a String, received ${product.category},
    * price: needs to be a Number, received ${product.price},
    * code: needs to be a String, received ${product.code},
    * stock: needs to be a Number, received ${product.stock},
    * availability: needs to be a String, received ${product.availability}`
}

const generateAddCartErrorInfo = (cart) => {
    return `One or more properties were incomplete or not valid.
    List of required properties:
    * userId: needs to be a String, received ${cart.userId}
    * products: needs to be an array of objects with productId and quantity, received ${cart.products}`
}

module.exports = { generateUserErrorInfo, generateProductErrorInfo, generateAddCartErrorInfo }