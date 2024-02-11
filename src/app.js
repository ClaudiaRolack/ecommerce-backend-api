const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser')
const SwaggerUiExpress = require('swagger-ui-express');
const handlebars = require("express-handlebars");
const path = require('path');

const productsRouter = require('./routes/products.router.js');
const cartsRouter = require('./routes/carts.router.js');
const usersRouter = require('./routes/users.router.js');
const ordersRouter = require('./routes/orders.router.js');
const loggerRouter = require('./routes/logger.router.js');
const userPremiumRouter = require('./routes/usersPremium.router.js');

const { initializePassport } = require("./auth/passport.config.js");
const { errorHandler } = require('./middlewares/errors/index.js');

const loggerMiddleware = require('./middlewares/loggerMiddleware.js');
const logger = require('./utils/logger.js');
const specs = require('./config/swagger.js');

const app = express();
const PORT = process.env.PORT || 8080;


app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(__dirname, + "/views"));


app.use(express.static(path.join(__dirname, 'public')));


app.use(cookieParser());


initializePassport(passport);
app.use(passport.initialize());


app.use(errorHandler);


app.use(loggerMiddleware);


app.use('/apidocs', SwaggerUiExpress.serve, SwaggerUiExpress.setup(specs))


app.listen(PORT, () => {
    logger.info(`Servidor escuhando por el puerto ${PORT}`);
});


app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/sessions', usersRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/loggerTest', loggerRouter);
app.use('/api/users', userPremiumRouter);