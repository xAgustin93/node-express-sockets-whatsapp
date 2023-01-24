import mongoose from "mongoose";

const ChatMessageSchema = mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
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

export const ChatMessage = mongoose.model("ChatMessage", ChatMessageSchema);
