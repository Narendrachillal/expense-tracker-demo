import express from "express";
import { authMiddleware } from "../middlewares/authMiddelwares.js";
import {
  addExpense,
  deleteExpense,
  editExpense,
  exportPDF,
  getExpenses,
} from "../controllers/expenseContreoller.js";

const expenseRoute = express.Router();

expenseRoute.delete("/delete/:id", authMiddleware, deleteExpense);
expenseRoute.put("/edit/:id", authMiddleware, editExpense);
expenseRoute.get("/get", authMiddleware, getExpenses);
expenseRoute.post("/add", authMiddleware, addExpense);
expenseRoute.get("/export-pdf", authMiddleware, exportPDF);

export default expenseRoute;
