import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/config.js";
import authRoute from "./routes/authRoutes.js";
import expenseRoute from "./routes/expenseRoutes.js";
import { authMiddleware } from "./middlewares/authMiddelwares.js";
import User from "./Models/User.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);

app.use("/api/auth", authRoute);
app.use("/api/expenses", expenseRoute);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
