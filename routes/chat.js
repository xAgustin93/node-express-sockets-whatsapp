import express from "express";
import { ChatController } from "../controllers/index.js";
import { mdAuth } from "../middlewares/index.js";

const api = express.Router();

api.post("/chat", [mdAuth.asureAuth], ChatController.create);
api.get("/chat", [mdAuth.asureAuth], ChatController.getAll);
api.delete("/chat/:id", [mdAuth.asureAuth], ChatController.deleteChat);
api.get("/chat/:id", [mdAuth.asureAuth], ChatController.getChat);

export const chatRoutes = api;
