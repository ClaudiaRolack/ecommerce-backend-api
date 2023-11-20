const mongoose = require('mongoose');
const { MONGO_URL } = require('../config/config'); 

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexión exitosa a MongoDB');
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error.message);
  }
};

module.exports = { connectToDatabase };