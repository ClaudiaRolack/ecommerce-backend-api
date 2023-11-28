const { Router } = require("express");
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { usersService } = require('../repositories/index.js');
const { SECRET_KEY } = require('../config/config.js');
const { passportCall, authorization } = require('../auth/passport.config.js');
const { UserProfileDTO } = require('../dao/DTOs/userProfile.dto.js');

const router = Router();

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

router.post("/login", passport.authenticate('login', { session: false }), async (req, res) => {
    try {
        let email = req.body.email;
        const data = await usersService.validateUser(email);
        const firstName = data.firstName;
        const lastName= data.lastName;
        const rol = data.rol;

        const token = jwt.sign({ email, firstName, lastName, rol }, SECRET_KEY, { expiresIn: "24h" });
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

router.get("/logout", async (req, res) => {
    req.session.destroy((error) => {
        if (error) { return res.json({ status: "Logout error", body: error }) }
        res.redirect("../../login")
    });
});

router.get("/current", passportCall("jwt"), authorization("user"), (req, res) => { 
    
    const user = req.user; 

    const userSafeDTO = new UserProfileDTO(
        user.firstName,
        user.lastName,
        user.email,
        user.rol,
    );

    res.send(userSafeDTO);
});

module.exports = router