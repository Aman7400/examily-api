const mongoose = require('mongoose');

async function connectDB() {
  try {
    const res = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
    });
    console.log('Database Connected Successfuly - ', res.connection.host);
  } catch (error) {
    console.error(error);
  }
}

module.exports = connectDB;
