const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressRegex = /^[a-zA-Z0-9.,\s]+$/;
const kostSchema = new Schema({
  title: String,
  address: {
    type: String,
    required: true,
    match: addressRegex,
  },
  photos: [{ type: String, required: true }],
  description: String,
  link: String,
  capacity: Number,
  location: String,
  kamar: Number,
  owner: String,
  rekening: String,
  phoneNumber: String,
  price: Number,
  jenis: {
    type: String,
    enum: ["Laki-Laki", "Perempuan", "Campuran"],
  },
  statusKamar: String,
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
