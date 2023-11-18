const mongoose = require("mongoose");

const kostSchema = new mongoose.Schema({
  title: String,
  address: String,
  photos: [{ type: String }],
  description: String,
  moreinfo: String,
  capacity: Number,
  location: String,
  kamar: Number,
  owner: String,
  phoneNumber: Number,
  price: Number,
  wifi: Boolean,
  parking: Boolean,
  kitchen: Boolean,
  laundry: Boolean,
  servant: Boolean,
  free: Boolean,
  fullRoom: Boolean,
  pet: Boolean,
  energy: Boolean,
  water: Boolean,
});

module.exports = mongoose.model("Kost", kostSchema);
