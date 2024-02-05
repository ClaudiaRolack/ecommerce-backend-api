class UserProfileDTO {
       
    firstName;
    lastName;
    email;
    rol;
    cartId;

    constructor(firstName, lastName, email, rol, cartId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.rol = rol;
        this.cartId = cartId;
    }
}

module.exports = { UserProfileDTO }