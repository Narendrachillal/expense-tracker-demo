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
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);

app.use("/api/auth", authRoute);
app.use("/api/expenses", expenseRoute);

// Verify user session
app.get("/api/auth/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
    console.log(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
