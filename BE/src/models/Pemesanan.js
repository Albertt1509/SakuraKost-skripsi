const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const pemesananSchema = new Schema({
  title: {
    type: String,
  },
  tanggalPemesanan: {
    type: String,
  },
  durasi: {
    type: String,
  },
  harga: {
    type: Number,
  },
  name: {
    type: String,
  },
  status: {
    type: String,
    default: 'Sedang Di Proses'
  },
  jenisPembayaran: {
    type: String,
    enum: ["Bayar Di Tempat", "Transfer Bank"],
  },
  selpi: [{ type: String, required: true }],
  transfer: [{ type: String, required: true }],

  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Pemesanan = mongoose.model("Pemesanan", pemesananSchema);

module.exports = Pemesanan;
