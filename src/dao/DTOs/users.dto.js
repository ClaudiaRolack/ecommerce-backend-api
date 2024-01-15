class UsersDTO {
       
    firstName;
    lastName;
    email;
    age;
    password;
    rol;
    cart;
    last_connection;

    constructor(userData) {
        this.firstName = userData.firstName;
        this.lastName = userData.lastName;
        this.email = userData.email;
        this.age = userData.age;
        this.password = userData.password;
        this.rol = userData.rol;
        this.cart = userData.cart,
        this.last_connection = userData.last_connection
    }
}

module.exports = { UsersDTO }