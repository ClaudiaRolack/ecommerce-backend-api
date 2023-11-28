class UserProfileDTO {
       
    firstName;
    lastName;
    email;
    rol;

    constructor(firstName, lastName, email, rol) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.rol = rol;
    }
}

module.exports = { UserProfileDTO }