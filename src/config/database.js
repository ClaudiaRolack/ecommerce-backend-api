const mongoose = require('mongoose');
const logger = require('../utils/logger.js'); 

const dotenv = require('dotenv');
dotenv.config();

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    logger.info('Conexión exitosa a MongoDB');
  } catch (error) {
    logger.error('Error de conexión a MongoDB:', error.message);
  }
};

module.exports = { connectToDatabase };