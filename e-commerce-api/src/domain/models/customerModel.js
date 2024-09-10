const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  street: String,
  city: String,
});

const CustomerSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  address: AddressSchema,
}, { timestamps: true });

module.exports = mongoose.model('Customer', CustomerSchema);