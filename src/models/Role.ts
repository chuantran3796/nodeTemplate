import mongoose from "mongoose"; 

var roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  value: {
    type: Number,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Role", roleSchema);
