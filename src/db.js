const mongoose = require('mongoose');
const { MONGODB_URI } = require('./config');

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI, {
      autoIndex: true,
      serverSelectionTimeoutMS: 7000,
    });
    console.log('[DB] MongoDB connected:', MONGODB_URI);
  } catch (err) {
    console.error('[DB] MongoDB connection error:', err?.message);
    throw err;
  }

  mongoose.connection.on('error', (e) => {
    console.error('[DB] connection error:', e?.message);
  });
}

module.exports = { connectDB };
