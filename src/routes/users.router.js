const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Router } = require("express");
const { usersService } = require('../repositories/index.js');
const { SECRET_KEY, NODEMAILER_EMAIL } = require('../config/config.js');
const { passportCall } = require('../auth/passport.config.js');
const { UserProfileDTO } = require('../dao/DTOs/userProfile.dto.js');
const { authorizationMiddleware } = require('../auth/authMiddleware.js');
const { generateProducts } = require('../utils/faker.js');
const { transporter } = require('../helpers/nodemailer.js')

const router = Router();

router.get('/current', passportCall('jwt'), authorizationMiddleware(['user', 'admin', 'premium']), (req, res) => {

    const user = req.user;

    const userSafeDTO = new UserProfileDTO(
        user.firstName,
        user.lastName,
        user.email,
        user.rol,
    );

    res.send(userSafeDTO);
});

router.get('/mockingproducts', async (req, res) => {
    let products = []
    for (let i = 0; i < 100; i++) {
        products.push(generateProducts())
    }

    res.send({ status: "success", payload: products })
})

router.get("/:uid", async (req, res) => {
    try {
        let { uid } = req.params;
        let usersData = await usersService.userById(uid);
        res.send({ result: "success", payload: usersData, message: 'La solicitud se procesó correctamente' });
    } catch (error) {
        console.log(error);
    };
});

router.post('/register', passport.authenticate('register', { session: false }), async (req, res) => {
    try {
        let newUser = req.body
        await usersService.createUser(newUser)
        res.redirect('/login')
    } catch (error) {
        console.log('Error de resgistro:', error);
        res.redirect('/failregister');
        return 'Error de resgistro';
    }
});

router.get('/failregister', async (req, res) => {
    console.log('Falla de registro');
    res.send({ error: 'Falló' })
});

router.post('/login', passport.authenticate('login', { session: false }), async (req, res) => {
    try {
        let email = req.body.email;
        const data = await usersService.validateUser(email);
        const firstName = data.firstName;
        const lastName = data.lastName;
        const rol = data.rol;

        const token = jwt.sign({ email, firstName, lastName, rol }, SECRET_KEY, { expiresIn: "24h" });
        res.cookie("token", token, { maxAge: 60 * 60 * 1000, httpOnly: true });

        if (data && (await bcrypt.compare(req.body.password, data.password))) {
            if (data.rol === 'admin') {
                res.json(token)
            } else {
                res.json(token)
            }
        } else {
            res.redirect('../../login');
        }

    } catch (error) {
        console.error('Error al acceder al perfil:', error);
        return 'Error al acceder al perfil';
    }
});

router.get('/logout', async (req, res) => {
    req.session.destroy((error) => {
        if (error) { return res.json({ status: 'Logout error', body: error }) }
        res.redirect('../../login')
    });
});

router.post('/forgot-password', async (req, res) => {

    const { email } = req.body;

    try {

        if (email) {

            const user = await usersService.getUserByEmail(email);

            if (!user) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }

            const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
            res.cookie("token", token, { maxAge: 60 * 60 * 1000, httpOnly: true });

            const resetPassword = `http://localhost:8080/reset-password/${token}`;

            const mailOptions = {
                from: NODEMAILER_EMAIL,
                to: user.email,
                subject: 'Restablecimiento de Contraseña',
                text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: ${resetPassword}`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(error);
                    res.status(500).send('Error al enviar el correo de restablecimiento.');
                } else {
                    console.log('Correo enviado: ' + info.response);
                    res.status(200).send('Se ha enviado un correo de restablecimiento de contraseña.');
                }
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
})

router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    const result = await usersService.updatePassword(token, newPassword);

    if (!result) {
        return res.status(500).json({ error: "Error al actualizar la contraseña" });
    }

});

module.exports = router