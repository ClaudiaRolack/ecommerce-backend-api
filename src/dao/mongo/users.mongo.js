const { usersModel } = require('./models/users.model.js');
const { createHash } = require('../../helpers/Encrypt.js');

class UsersMongo {

    createUser = async (userData) => {
        try {
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
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    getUserByEmail = async (email) => {
        try {
            const result = await usersModel.findOne({ email });
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    userById = async (id) => {
        try {
            let userId = await usersModel.findById(id);
            if (!userId) {
                return 'El ID no existe';
            } 
            return userId;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    updateUser = async (id, user) => {
        try {
            let result = await usersModel.updateOne({ _id: id }, { $set: user });
            return result
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    validateUser = async (email) => {
        try {
            const user = await usersModel.findOne({ email });
            if (!user) { return 'Usuario no encontrado' };
            return user;
        } catch (error) {
            console.log(error);
            return null;
        };
    };

}

module.exports = { UsersMongo }