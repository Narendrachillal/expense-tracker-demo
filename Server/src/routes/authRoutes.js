import express from "express";
import { login, register, userVerify } from "../controllers/Authcontrollers.js";
import { authMiddleware } from "../middlewares/authMiddelwares.js";

const authRoute = express.Router();

authRoute.post("/register", register);
authRoute.post("/login", login);
authRoute.post("/me", authMiddleware, userVerify);

export default authRoute;
