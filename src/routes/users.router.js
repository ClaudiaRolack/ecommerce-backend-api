const { Router } = require("express");
const passport = require('passport');
const { productsService } = require("../repositories");

const router = Router();

router.post('/register', passport.authenticate('register', { session: false }), async (req, res) => {
    try {
        let newUser = req.body
        await productsService.createUser(newUser)
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

module.exports = router