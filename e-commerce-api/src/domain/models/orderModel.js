const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
  items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
  totalAmount: Number,
  status: { type: String, default: 'pending' },
  delivery: { type: Schema.Types.ObjectId, ref: 'Delivery' },
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);