const mongoose = require("mongoose");

const rumahSchema = new mongoose.Schema({
  name: String,
  address: String,
  photos: [{ type: String }],
  location: String,
  phoneNumber: Number,
});

module.exports = mongoose.model("rumah", rumahSchema);
