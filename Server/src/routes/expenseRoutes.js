import express from "express";
import { authMiddleware } from "../middlewares/authMiddelwares.js";
import {
  addExpense,
  deleteExpense,
  exportPDF,
  getExpenses,
} from "../controllers/expenseContreoller.js";

const expenseRoute = express.Router();

expenseRoute.post("/add", authMiddleware, addExpense);
expenseRoute.get("/get", authMiddleware, getExpenses);
expenseRoute.delete("/delete/:id", authMiddleware, deleteExpense);
expenseRoute.get("/export-pdf", authMiddleware, exportPDF);

export default expenseRoute;
