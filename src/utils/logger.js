const { createLogger, format, transports } = require('winston');

const level = {
    debug: 'debug',
    http: 'http',
    info: 'info',
    warn: 'warn',
    error: 'error',
    silly: 'silly',
}

const devLogger = createLogger({
    level: 'debug',
    format: format.combine(format.colorize(), format.simple()),
    transports: [new transports.Console()],
});

const prodLogger = createLogger({
    level: 'info',
    format: format.json(),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'ERRORS.log', level: 'error' })
    ]
});

const logger = (process.env.LOGGERENV === 'production' ? prodLogger : devLogger);

module.exports = logger