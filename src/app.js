const dotenv = require('dotenv');
const express = require("express");
const app = express();
const { dbConnect } = require('./config/mongo.js');
const cartsRouter = require('./app/routes/carts.router.js');
const productsRouter = require('./app/routes/products.router.js');
const userRouter = require('./app/routes/user.router.js');


dotenv.config();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/cart', cartsRouter);
app.use('/api/product', productsRouter);
app.use('/api/session', userRouter);

dbConnect();
app.listen(PORT, () => {
    console.log(`Servidor escuhando por el puerto ${PORT}`);
});