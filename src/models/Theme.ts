import mongoose from "mongoose"; // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  image: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  background: {
    type: String,
    unique: true,
    index: true,
  },
  describe: {
    type: String,
  },
});

//Export the model
module.exports = mongoose.model("User", userSchema);
