const express = require("express");
const mongoose = require("mongoose");

const productsRouter = require('./routes/products.router.js');

const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(PORT, () => {
    console.log(`Servidor escuhando por el puerto ${PORT}`);
});


app.use("/api/products", productsRouter);