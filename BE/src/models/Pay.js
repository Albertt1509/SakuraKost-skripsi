const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paySchema = new Schema({
  name: String,
  address: String,
  data: kost,
});

module.exports = mongoose.model("Pembayaran", paySchema);
