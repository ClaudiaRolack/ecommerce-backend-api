const { Router } = require("express");
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { usersService } = require('../repositories/index.js')
const { SECRET_KEY } = require('../config/config.js'); 

const router = Router();



router.post('/register', passport.authenticate('local', { session: false }), async (req, res) => {
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

router.post("/login", passport.authenticate('local', { session: false }), async (req, res) => {

    try {
        let email = req.body.email;
        const data = await usersService.validateUSer(email);
        const password = data.password
        const rol = data.rol

        const token = jwt.sign({ email, password, rol }, SECRET_KEY, { expiresIn: "24h" });
        res.cookie("token", token, { maxAge: 60 * 60 * 1000, httpOnly: true });

        if (data && (await bcrypt.compare(req.body.password, data.password))) {
            if (data.rol === "admin") {
                res.json(token)
            } else {
                res.json(token)
            }
        } else {
            res.redirect("../../login");
        }

    } catch (error) {
        console.error("Error al acceder al perfil:", error);
        return "Error al acceder al perfil";
    }
});

module.exports = router