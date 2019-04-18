const mongoose = require("mongoose");

const { Schema } = mongoose;

let Message = null;

try {
  const MessageSchema = new Schema({
    message: {
        type: String
    },
    user_id: {
      type: String
    },
    status: {
       type: Boolean,
       default: false
    },
    created_on: {
      type: Date,
      default: Date.now
    }
  });
  Message = mongoose.model("messages", MessageSchema);
} catch (e) {
  Message = mongoose.model("messages");
}

module.exports = Message;
