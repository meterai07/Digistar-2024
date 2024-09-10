const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  order: { type: Schema.Types.ObjectId, ref: 'Order' },
  amount: Number,
  status: { type: String, default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);