const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        const mongoUrl = process.env.MONGO_URL;
        await mongoose.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conexión exitosa');
    } catch (error) {
        console.error('Error de conexión:', error.message);
    }
};

module.exports = { dbConnect };
