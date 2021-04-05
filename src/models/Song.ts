import mongoose from "mongoose";

var SongSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  artist: {
    type: String,
    required: true,
  },
  artwork: {
    type: String,
  },
  duration: {
    type: Number,
  },
},{
  timestamps: true,
});

module.exports = mongoose.model("Song", SongSchema);
