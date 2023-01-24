import mongoose from "mongoose";

const ChatSchema = mongoose.Schema({
  participant_one: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  participant_two: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Chat = mongoose.model("Chat", ChatSchema);
