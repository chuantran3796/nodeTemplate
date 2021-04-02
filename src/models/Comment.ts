import { Schema } from "mongoose";

const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var commentSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    text: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    image: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: true,
    },
    audio: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Comment", commentSchema);
