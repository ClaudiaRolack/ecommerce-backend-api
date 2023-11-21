class CartItemDTO {
    constructor(productId, quantity) {
        this.productId = productId;
        this.quantity = quantity;
    }
}

class CartDTO {
    constructor(userId, items) {
        this.userId = userId;
        this.items = items || []; // Array de objetos CartItemDTO
    }
}

module.exports = { CartItemDTO, CartDTO };