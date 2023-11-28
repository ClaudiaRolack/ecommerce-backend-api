const { usersModel } = require('./models/users.model.js');
const { createHash } = require('../../helpers/Encrypt.js');

class UsersMongo {

    createUser = async (userData) => {
        const { firstName, lastName, email, age, password, rol } = userData;

        const newUser = {
            firstName,
            lastName,
            email,
            age,
            password: createHash(password),
            rol
        };
   
        const result = await usersModel.create(newUser);
        return result;
    }

    getUserByEmail = async (email) => {
        const result = await usersModel.findOne({ email });
        return result;
    }

    getUserById = async (id) => {
        let uid = id;
        let userById = await usersModel.findById(uid);
        if (!userById) {
            return "El ID no existe";
        } else {
            return userById;
        }
    }

    validateUser = async (email) => {
        try {
            const user = await usersModel.findOne({email});
            if (!user) { return "Usuario no encontrado" };
            return user;
        } catch (error) {
            console.error("Error al validar usuario:", error)
            return "Error al validar usuario";
        };
    };

}

module.exports = { UsersMongo }