const { usersModel } = require('./models/users.model.js');
const { createHash } = require('../../helpers/Encrypt.js');

class UsersMongo {

    createUser = async (userData) => {
        const { firstName, lastName, email, age, password,rol } = userData;

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

}

module.exports = { UsersMongo }