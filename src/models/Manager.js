const mongoose = require('mongoose');

const ManagerSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Manager', ManagerSchema);
