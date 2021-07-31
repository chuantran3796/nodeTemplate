import mongoose, { Schema } from "mongoose";

// Declare the Schema of the Mongo model
var roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Member",
    },
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "Member",
      },
    ],
  },
  {
    timestamps: true,
  }
);

//Export the model
export default mongoose.model("Room", roomSchema);
