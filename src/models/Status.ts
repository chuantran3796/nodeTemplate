import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var StorySchema = new mongoose.Schema({
  name: {
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
  Image: {
    type: String,
    required: true,
    unique: true,
  },
  Video: {
    type: String,
    required: true,
  },
});

//Export the model
module.exports = mongoose.model("Story", StorySchema);
