const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },

  alamat: String,
  nohp: {
    type: Number,
    unique: true,
  },

  password: String,
  role: {
    type: String,
    default: "user",
  },
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
