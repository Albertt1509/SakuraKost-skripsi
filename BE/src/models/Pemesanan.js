const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const pemesananSchema = new Schema({
  tanggalPemesanan: {
    type: String,
  },
  durasi: {
    type: String,
  },
  harga: {
    type: Number,
  },
  jenisPembayaran: {
    type: String,
    enum: ["Bayar Di Tempat", "Transfer Bank"],
  },
});

const Pemesanan = mongoose.model("Pemesanan", pemesananSchema);

module.exports = Pemesanan;
