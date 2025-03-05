import Expense from "../Models/Expense.js";
import PDFDocument from "pdfkit";

export const addExpense = async (req, res) => {
  try {
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

export const exportPDF = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }); // Fetch all expenses

    // Calculate Total Expenses
    const totalExpenses = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    const doc = new PDFDocument({ margin: 50 });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="expenses.pdf"');

    doc.pipe(res);

    // **Title**
    doc.fontSize(20).text("Expense Report", { align: "center" }).moveDown(2);

    // **Define Table Column Widths**
    const columnWidths = [100, 150, 250];
    const startX = 50;
    let y = doc.y;

    // **Table Header**
    doc
      .fontSize(12)
      .text("Amount (Rs)", startX, y, { width: columnWidths[0], bold: true })
      .text("Category", startX + columnWidths[0], y, { width: columnWidths[1] })
      .text("Description", startX + columnWidths[0] + columnWidths[1], y, {
        width: columnWidths[2],
      });

    y += 20; // Move Y position

    // **Draw Line Under Header**
    doc.moveTo(startX, y).lineTo(550, y).stroke();
    y += 10;

    // **Table Rows**
    expenses.forEach(({ amount, category, description }) => {
      doc
        .fontSize(10)
        .text(amount.toString(), startX, y, { width: columnWidths[0] })
        .text(category, startX + columnWidths[0], y, { width: columnWidths[1] })
        .text(description, startX + columnWidths[0] + columnWidths[1], y, {
          width: columnWidths[2],
        });
      y += 20;
    });

    // **Draw Line Above Total**
    doc.moveTo(startX, y).lineTo(550, y).stroke();
    y += 10;

    // **Total Expenses Row**
    doc
      .fontSize(12)
      .text("Total spends:", startX, y, {
        width: columnWidths[0],
        bold: true,
      })
      .text(totalExpenses.toString(), startX + columnWidths[0], y, {
        width: columnWidths[1],
        bold: true,
      });

    doc.end();
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
};

export const editExpense = async (req, res) => {
  try {
    const { amount, category, description } = req.body;

    if (!amount || !category || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      { amount, category, description }
      // { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: "Error updating expense", error });
  }
};
