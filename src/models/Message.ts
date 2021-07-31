import mongoose, { Schema } from "mongoose";

// Declare the Schema of the Mongo model
var messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    image: {
      type: String,
    },
    video: {
      type: String,
    },
    audio: {
      type: String,
    },
    system: { type: Boolean },
    sent: { type: Boolean },
    received: { type: Boolean },
    pending: {
      type: Boolean,
    },
    quickReplies: [
      {
        type: Schema.Types.ObjectId,
        ref: "QuickReplies",
      },
    ],
    member: {
      type: Schema.Types.ObjectId,
      ref: "Member",
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Message", messageSchema);
