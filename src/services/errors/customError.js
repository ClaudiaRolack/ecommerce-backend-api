class CustomError {
    static createError(err) {
        const error = new Error(err.messagge, err.cause );
        // err.name = name;
        // err.code = code;
    }
}

module.exports = { CustomError }