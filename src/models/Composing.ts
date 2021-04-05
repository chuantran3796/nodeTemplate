import mongoose, { Schema } from "mongoose";

// Declare the Schema of the Mongo model
var composingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  birthDay: {
    type: String,
    required: true,
    unique: true,
  },
  songs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
});

//Export the model
module.exports = mongoose.model("Composing", composingSchema);
