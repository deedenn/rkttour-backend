const mongoose = require('mongoose');

const WidgetEventSchema = new mongoose.Schema({
  ts: { type: Date, default: Date.now },
  origin: String,
  data: {}, // Mixed
}, { strict: false, timestamps: false });

module.exports = mongoose.model('WidgetEvent', WidgetEventSchema);
