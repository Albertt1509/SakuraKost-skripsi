const mongoose = require("mongoose");
const { schema } = mongoose;
const KostSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  alamat: {
    type: String,
    require: true,
  },
  jarak: {
    type: String,
  },
  gambar: {
    type: [String],
  },
  deskripsi: {
    type: String,
    require: true,
  },
  rating: {
    type: String,
    min: 0,
    min: 5,
  },
  kamar: {
    type: [String],
  },
  harga: {
    type: Number,
    require: true,
  },
  featured: {
    type: Boolean,
    require: true,
  },
});

module.exports = mongoose.model("kost", KostSchema);
