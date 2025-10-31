const mongoose = require('mongoose');

const InteractionSchema = new mongoose.Schema({
  ts: { type: Date, default: Date.now },
  query: { type: String, required: true },
  suggestions: { type: Array, default: [] },
  chosenTourId: { type: String, default: null },
  fromWidget: { type: Boolean, default: false },
}, { timestamps: false });

module.exports = mongoose.model('Interaction', InteractionSchema);
