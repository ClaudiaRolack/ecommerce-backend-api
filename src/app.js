const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser')

const productsRouter = require('./routes/products.router.js');
const cartsRouter = require('./routes/carts.router.js');
const usersRouter = require('./routes/users.router.js');

const { initializePassport } = require("./auth/passport.config.js");

const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cookieParser())


initializePassport(passport)
app.use(passport.initialize())


app.listen(PORT, () => {
    console.log(`Servidor escuhando por el puerto ${PORT}`);
});


app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/sessions', usersRouter);