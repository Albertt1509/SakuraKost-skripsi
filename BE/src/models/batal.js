const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const batalSchema = new Schema({
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
        default: 'Dibatalkan',
    },
    sebab: {
        type: String
    },
    jenisPembayaran: {
        type: String,
        enum: ["Bayar Di Tempat", "Transfer Bank"],
    },
    selpi: [{ type: String, required: true }],
    transfer: [{ type: String, required: true }],
});

const Batal = mongoose.model("Batal", batalSchema);

module.exports = Batal;
