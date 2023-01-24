import { Chat, ChatMessage } from "../models/index.js";

async function create(req, res) {
  const { participant_id_one, participant_id_two } = req.body;

  const foundOne = await Chat.findOne({
    participant_one: participant_id_one,
    participant_two: participant_id_two,
  });

  const foundTwo = await Chat.findOne({
    participant_one: participant_id_two,
    participant_two: participant_id_one,
  });

  if (foundOne || foundTwo) {
    res.status(200).send({ msg: "Ya tienes un chat con este usuario" });
    return;
  }

  const chat = new Chat({
    participant_one: participant_id_one,
    participant_two: participant_id_two,
  });

  chat.save((error, chatStorage) => {
    if (error) {
      res.status(400).send({ msg: "Error al crear el chat" });
    } else {
      res.status(201).send(chatStorage);
    }
  });
}

async function getAll(req, res) {
  const { user_id } = req.user;

  Chat.find({
    $or: [{ participant_one: user_id }, { participant_two: user_id }],
  })
    .populate("participant_one")
    .populate("participant_two")
    .exec(async (error, chats) => {
      if (error) {
        return res.status(400).send({ msg: "Error al obtener los chats" });
      }

      const arrayChats = [];
      for await (const chat of chats) {
        const response = await ChatMessage.findOne({ chat: chat._id }).sort({
          createdAt: -1,
        });

        arrayChats.push({
          ...chat._doc,
          last_message_date: response?.createdAt || null,
        });
      }

      res.status(200).send(arrayChats);
    });
}

async function deleteChat(req, res) {
  const chat_id = req.params.id;

  Chat.findByIdAndDelete(chat_id, (error) => {
    if (error) {
      res.status(400).send({ msg: "Error al eliminar el chat" });
    } else {
      res.status(200).send({ msg: "Chat eliminado" });
    }
  });
}

async function getChat(req, res) {
  const chat_id = req.params.id;

  Chat.findById(chat_id, (error, chatStorage) => {
    if (error) {
      res.status(400).send({ msg: "Error al obtener el chat" });
    } else {
      res.status(200).send(chatStorage);
    }
  })
    .populate("participant_one")
    .populate("participant_two");
}

export const ChatController = {
  create,
  getAll,
  deleteChat,
  getChat,
};
