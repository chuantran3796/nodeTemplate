import mongoose, { Schema } from "mongoose";

// Declare the Schema of the Mongo model
var singerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  birthDay: {
    type: Date,
  },
  songs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
  describe: {
    type: String,
    unique: true,
  },
  image: {
    type: String,
  },
});

//Export the model
module.exports = mongoose.model("Singer", singerSchema);
