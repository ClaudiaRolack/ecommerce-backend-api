const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { usersModel } = require('./models/users.model.js');
const { createHash } = require('../../helpers/Encrypt.js');
const { SECRET_KEY } = require('../../config/dotenv.js');


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
            console.log(result)
            return result
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    updatePassword = async (token, newPassword) => {
        try {
            const decodedToken = jwt.verify(token, SECRET_KEY);
            const emailToken = decodedToken.email;

            const user = await usersModel.findOne({ email: emailToken });

            if (!user) {
                console.log('Usuario no encontrado.');
                return { success: false, message: 'Usuario no encontrado.' };
            }

            const isSamePassword = await bcrypt.compare(newPassword, user.password);
            if (isSamePassword) {
                console.log('La nueva contraseña es la misma que la anterior.');
                return { success: false, message: 'La nueva contraseña no puede ser la misma que la anterior.' };
            }

            const hashedPassword = createHash(newPassword);

            const result = await usersModel.findOneAndUpdate({ email: emailToken }, { $set: { password: hashedPassword } }, { new: true });

            if (result) {
                console.log('Contraseña actualizada con éxito:', result);
                return { success: true, message: 'Contraseña actualizada con éxito.' };
            } else {
                console.log('Error al actualizar la contraseña.');
                return { success: false, message: 'Error al actualizar la contraseña.' };
            }
        } catch (error) {
            console.error('Error al restablecer la contraseña:', error);
            return { success: false, message: 'Error al restablecer la contraseña.' };
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