const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeliverySchema = new Schema({
  order: { type: Schema.Types.ObjectId, ref: 'Order' },
  address: String,
  deliveryDate: Date,
  status: { type: String, default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Delivery', DeliverySchema);