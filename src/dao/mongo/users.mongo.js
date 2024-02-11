const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { usersModel } = require('./models/users.model.js');
const { createHash } = require('../../helpers/Encrypt.js');
const { transporter } = require('../../helpers/nodemailer.js');
const { cartsModel } = require('./models/carts.model.js');


class UsersMongo {

    createUser = async (userData, carts) => {
        try {
            const { firstName, lastName, email, age, password, rol,cart } = userData;

            const newUser = {
                firstName,
                lastName,
                email,
                age,
                password: createHash(password),
                rol,
                cart
            };

            if (rol === 'user' || rol === 'premium') {
                const newCart = await cartsModel.create(carts);
                newUser.cart = newCart._id;
            }

            const result = await usersModel.create(newUser);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    getAllUsers = async () => {
        try {
            const users = await usersModel.find({}, { _id: 1, firstName: 1, email: 1, rol: 1 }).lean();
            return users;
        } catch (error) {
            console.error('Error al obtener usuarios desde la base de datos:', error);
            throw new Error('Error interno al obtener usuarios');
        }
    };

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
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
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

    getCandidatesForDeletion = async (lastConnection) => {
        try {
            return await usersModel.find({ last_connection: { $lt: lastConnection } });
        } catch (error) {
            console.error('Error al obtener candidatos para eliminación:', error);
            throw new Error('Error interno al obtener candidatos para eliminación');
        }
    }

    sendDeletionEmail = async (email) => {
        try {
            const mailOptions = {
                from: process.env.NODEMAILER_EMAIL,
                to: email,
                subject: 'Eliminación de cuenta por inactividad',
                text: 'Tu cuenta ha sido eliminada debido a inactividad durante los últimos 30 minutos.',
            };

            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error al enviar correo de eliminación:', error);
            throw new Error('Error interno al enviar correo de eliminación');
        }
    }

    UpdateUserRol = async (userId, newRole) => {
        try {
            const updatedUser = await usersModel.findByIdAndUpdate(userId, { rol: newRole }, { new: true });
            if (!updatedUser) {
                throw new Error('Usuario no encontrado');
            }
            return updatedUser.save();
        } catch (error) {
            throw new Error('Error al actualizar el rol del usuario');
        }
    }

    deleteUser = async (id) => {
        try {
            const user = await usersModel.findByIdAndDelete(id);
            return user;
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            throw new Error('Error interno al eliminar usuario');
        }
    }

}

module.exports = { UsersMongo }