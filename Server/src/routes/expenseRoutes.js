import express from "express";
import { authMiddleware } from "../middlewares/authMiddelwares.js";
import {
  addExpense,
  deleteExpense,
  getExpenses,
} from "../controllers/expenseContreoller.js";

const expenseRoute = express.Router();

expenseRoute.post("/add", authMiddleware, addExpense);
expenseRoute.get("/get", authMiddleware, getExpenses);
expenseRoute.delete("/delete/:id", authMiddleware, deleteExpense);

export default expenseRoute;
