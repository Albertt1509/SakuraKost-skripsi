const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const selesaiSchema = new Schema({
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
        default: 'Selesai',
    },
    jenisPembayaran: {
        type: String,
        enum: ["Bayar Di Tempat", "Transfer Bank"],
    },
    selpi: [{ type: String, required: true }],
    transfer: [{ type: String, required: true }],
});

const Selesai = mongoose.model("Selesai", selesaiSchema);

module.exports = Selesai;
