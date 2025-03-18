import API from "../api/axiosInstance";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";

export const fetchExpenses = async () => {
  try {
    const { data } = await API.get("expenses/get");
    return data;
  } catch (error) {
    console.error("Fetch Error:", error.response?.data || error);
    throw error;
  }
};

export const addExpense = async (amount, category, description) => {
  if (!amount || !category || !description) {
    throw new Error("Missing fields, Please fill all sections");
  }

  try {
    await API.post("expenses/add", { amount, category, description });
  } catch (error) {
    console.error("Error adding expense:", error);
    throw error.response?.data;
  }
};

export const deleteExpense = async (id) => {
  try {
    await API.delete(`expenses/delete/${id}`);
  } catch (error) {
    console.error("Error deleting expense:", error);
    throw error;
  }
};

export const updateExpense = async (id, updatedExpense) => {
  const response = await API.put(`expenses/edit/${id}`, updatedExpense);
  return response.data;
};

export const downloadExpensesPDF = async (expenses) => {
  try {
    if (!expenses || expenses.length === 0) {
      toast.warn("No expenses available to download.");
      return null;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      toast.warn("You must be logged in to download the report.");
      return;
    }

    const response = await API.get("expenses/export-pdf", {
      headers: { Authorization: `Bearer ${token}` },
      responseType: "blob",
    });

    saveAs(response.data, "expenses.pdf");

    toast.success("PDF downloaded successfully!");
  } catch (error) {
    console.error("Error downloading PDF:", error);
    toast.error("Error downloading PDF. Please try again.");
    throw error;
  }
};
