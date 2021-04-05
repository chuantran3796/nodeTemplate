import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var StorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    content: {
      type: String,
    },
    image: {
      type: String,
      required: true,
      unique: true,
    },
    video: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Story", StorySchema);
