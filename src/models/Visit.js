const mongoose = require('mongoose');

const VisitSchema = new mongoose.Schema({
  ts: { type: Date, default: Date.now },
  path: String,
  referrer: String,
  ua: String,
  ip: String,
}, { timestamps: false });

module.exports = mongoose.model('Visit', VisitSchema);
