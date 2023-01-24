import mongoose from "mongoose";

const GroupMessageSchema = mongoose.Schema(
  {
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    message: String,
    type: {
      type: String,
      enum: ["TEXT", "IMAGE"],
    },
  },
  {
    timestamps: true,
  }
);

export const GroupMessage = mongoose.model("GroupMessage", GroupMessageSchema);
