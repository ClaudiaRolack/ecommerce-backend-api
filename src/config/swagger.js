const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition:{
        openapi: '3.0.1',
        info:{
            title:'Documentacion de api',
            description:'api clase swagger'
        },
    },
    apis:[
        'src/docs/products.yaml',
        'src/docs/carts.yaml'
    ]
};

const specs = swaggerJsdoc(swaggerOptions);

module.exports = specs