import mongoose from "mongoose";
// Declare the Schema of the Mongo model
var groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    image: {
      type: String,
      unique: true,
    },
    describe: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Group", groupSchema);
