import mongoose from "mongoose";

var memberSchema = new mongoose.Schema(
  {
    lms_id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    fcm_token: {
      type: String,
    },
    student_code: {
      type: String,
    },
    avatar: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Member", memberSchema);
