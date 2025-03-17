import { createContext, useContext, useEffect, useState } from "react";
import {
  addExpense,
  deleteExpense,
  fetchExpenses,
  updateExpense,
} from "../api/apiService";

const ExpenseContext = createContext();
export const useExpenses = () => useContext(ExpenseContext);

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const data = await fetchExpenses();
        setExpenses(data);
      } catch {
        toast.error("Error fetching expenses");
      }
    };
    loadExpenses();
  }, []);

  const addNewExpense = async (amount, category, description) => {
    try {
      await addExpense(amount, category, description);
      toast.success("Expense added successfully!");
      setExpenses(await fetchExpenses());
    } catch (error) {
      toast.warn(error.message || "Error adding expense");
    }
  };

  const updateExistingExpense = async (id, updatedData) => {
    try {
      await updateExpense(id, updatedData);
      toast.success("Expense updated successfully!");
      setExpenses(await fetchExpenses());
    } catch (error) {
      toast.warn(error.message || "Error updating expense");
    }
  };

  const removeExpense = async (id) => {
    try {
      await deleteExpense(id);
      toast.success("Expense deleted successfully!");
      setExpenses(await fetchExpenses());
    } catch {
      toast.error("Error deleting expense");
    }
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        addNewExpense,
        updateExistingExpense,
        removeExpense,
        loading,
        setLoading,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
