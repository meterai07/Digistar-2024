const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: String,
  price: Number,
  stock: Number,
}, { timestamps: true });

module.exports = mongoose.model('Item', ItemSchema);