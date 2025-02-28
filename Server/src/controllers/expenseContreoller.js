import Expense from "../Models/Expense.js";

export const addExpense = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Debugging incoming request

    const { amount, category, description } = req.body;
    if (!amount || !category || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newExpense = new Expense({
      user: req.user.id, // Ensure `authMiddleware` is attaching `req.user`
      amount,
      category,
      description,
    });

    await newExpense.save();
    res.status(201).json({ message: "Expense added successfully" });
  } catch (error) {
    console.error("Expense Error:", error.message); // Log the actual error
    res
      .status(500)
      .json({ message: "Error adding expense", error: error.message });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting expense" });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching expenses" });
  }
};
