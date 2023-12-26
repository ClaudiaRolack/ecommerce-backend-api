const nodemailer = require('nodemailer');
const { NODEMAILER_EMAIL, NODEMAILER_PASS } = require('../config/config');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: NODEMAILER_EMAIL,
        pass: NODEMAILER_PASS
    }
});

module.exports = { transporter }