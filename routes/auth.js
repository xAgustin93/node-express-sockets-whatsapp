import express from "express";
import { AuthController } from "../controllers/index.js";

const api = express.Router();

api.post("/auth/register", AuthController.register);
api.post("/auth/login", AuthController.login);
api.post("/auth/refresh_access_token", AuthController.refreshAccessToken);

export const authRoutes = api;
