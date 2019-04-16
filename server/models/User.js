const mongoose = require("mongoose");

const { Schema } = mongoose;

let User = null;

try {
  const UserSchema = new Schema({
    username: {
      type: String,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    created_on: {
      type: Date,
      default: Date.now
    }
  });
  User = mongoose.model("users", UserSchema);
} catch (e) {
  User = mongoose.model("users");
}

module.exports = User;
