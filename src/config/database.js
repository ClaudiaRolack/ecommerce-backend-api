const mongoose = require('mongoose');
const { MONGO_URL } = require('./dotenv.js');
const logger = require('../utils/logger.js'); 

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    logger.info('Conexión exitosa a MongoDB');
  } catch (error) {
    logger.error('Error de conexión a MongoDB:', error.message);
  }
};

module.exports = { connectToDatabase };