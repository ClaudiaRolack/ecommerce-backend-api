const { EErrors } = require('../../services/errors/enums.js');

const errorHandler = (error, req, res, next) => {
    console.log(error.cause);
    switch (error.code) {
        case EErrors.INVALID_TYPES_ERROR:
            res.send({ status: 'error', error: error.name })
            break;
        case EErrors.ADD_CART_ERROR:
            res.send({ status: 'error', error: error.name })
            break;
        default:
            res.send({ status: 'error', error: 'Unhandled error' })
    }
}

module.exports = { errorHandler }