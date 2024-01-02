const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    MONGO_URL: process.env.MONGO_URL,
    PORT: process.env.PORT,
    persistence: process.env.PERSISTENCE,
    SECRET_KEY: process.env.SECRET_KEY,
    NODEMAILER_EMAIL: process.env.NODEMAILER_EMAIL,
    NODEMAILER_PASS: process.env.NODEMAILER_PASS
};