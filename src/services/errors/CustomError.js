class CustomError {
    static createError({ name = 'Error', cause, messagge, code = 1 }) {
        const error = new Error(messagge, { cause });
        error.name = name;
        error.code = code;
        // throw error;
    }
}

module.exports = { CustomError }