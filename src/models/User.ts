import mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    imageCover: {
      type: String,
    },
    birthDay: {
      type: Date,
    },
    name: { type: String, required: true },
    phone: {
      type: Number,
    },
    bio: {
      type: String,
    },
    
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
