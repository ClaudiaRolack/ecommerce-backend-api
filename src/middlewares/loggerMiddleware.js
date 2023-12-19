const logger = require('../utils/logger.js');

const loggerMiddleware = (req, res, next) => {
    req.logger = logger;
    next();
};

module.exports =  loggerMiddleware 