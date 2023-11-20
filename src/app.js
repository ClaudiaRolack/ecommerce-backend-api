const express = require("express");
const mongoose = require("mongoose");


const app = express();
const PORT = process.env.PORT || 8080;


// const { MONGO_URL } = require('./config/config.js');


// mongoose.connect(MONGO_URL)
//     .then(() => {
//         console.log("Conectado a la base de datos")
//     })
//     .catch(error => {
//         console.log("Error al intentar conectarse a la BD", error)
//     })


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(PORT, () => {
    console.log(`Servidor escuhando por el puerto ${PORT}`);
});