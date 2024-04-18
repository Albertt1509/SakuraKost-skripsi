const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: function (value) {
        return /\S+@\S+\.\S+/.test(value);
      },
      message: "Email tidak valid",
    },
  },

  alamat: String,
  nohp: {
    type: String,
    unique: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  password: String,
  role: {
    type: String,
    default: "user",
  },
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: "Kost",
    },
  ],

});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
