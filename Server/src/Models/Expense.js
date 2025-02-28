import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: { type: Number, required: true },
  category: { type: String, enum: ["Income", "Expense"], required: true },
  description: String,
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Expense", ExpenseSchema);
