const mongoose = require('mongoose');

const STATUSES = [
  'запрос клиента',
  'отправлено предложение',
  'бронирование тура',
  'оплачено',
  'тур выполнен',
];

const ApplicationSchema = new mongoose.Schema({
  ts: { type: Date, default: Date.now },
  name: { type: String, required: true },
  email: String,
  phone: String,
  dates: String,
  destination: String,
  budget: Number,
  message: String,
  status: { type: String, enum: STATUSES, default: STATUSES[0] },
  fromInteractionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Interaction', default: null },
  chosenTourId: { type: String, default: null },
}, { timestamps: false });

ApplicationSchema.statics.STATUSES = STATUSES;

module.exports = mongoose.model('Application', ApplicationSchema);
