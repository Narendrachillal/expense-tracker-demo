import { useState, useEffect, useCallback } from "react";
import {
  Container,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import {
  fetchExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
  downloadExpensesPDF,
} from "../api/apiService";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editExpense, setEditExpense] = useState(null);

  const loadExpenses = useCallback(async () => {
    try {
      const data = await fetchExpenses();
      setExpenses(data);
    } catch {
      toast.error("Error fetching expenses");
    }
  }, []);

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSaveExpense = async () => {
    try {
      if (editExpense) {
        await updateExpense(editExpense._id, form);
        toast.success("Expense updated successfully!");
      } else {
        await addExpense(form.amount, form.category, form.description);
        toast.success("Expense added successfully!");
      }
      setForm({ amount: "", category: "", description: "" });
      setEditExpense(null);
      setEditDialogOpen(false);
      loadExpenses();
    } catch {
      toast.warn("Error saving expense");
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);
      toast.success("Expense deleted successfully!");
      loadExpenses();
    } catch {
      toast.error("Error deleting expense");
    }
  };

  const handleDownloadPDF = async () => {
    if (!expenses.length) {
      toast.warn("No expenses available to download.");
      return;
    }
    setLoading(true);
    try {
      await downloadExpensesPDF(expenses);
    } catch {
      toast.error("Error downloading PDF.");
    } finally {
      setLoading(false);
    }
  };

  const totalIncome = expenses
    .filter((exp) => exp.category === "Income")
    .reduce((acc, exp) => acc + exp.amount, 0);
  const totalExpenses = expenses
    .filter((exp) => exp.category === "Expense")
    .reduce((acc, exp) => acc + exp.amount, 0);
  const balance = totalIncome - totalExpenses;

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          padding: 2,
          marginBottom: 2,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography variant="h6">Summary</Typography>
        <Typography>Total Income: ₹{totalIncome}</Typography>
        <Typography>Total Expenses: ₹{totalExpenses}</Typography>
        <Typography variant="h6" color={balance >= 0 ? "green" : "red"}>
          Balance: ₹{balance}
        </Typography>
      </Paper>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <TextField
          name="amount"
          label="Amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        <TextField
          name="description"
          label="Description"
          value={form.description}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        <FormControl margin="normal" fullWidth>
          <InputLabel>Category</InputLabel>
          <Select name="category" value={form.category} onChange={handleChange}>
            <MenuItem value="Expense">Expense</MenuItem>
            <MenuItem value="Income">Income</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={handleSaveExpense} variant="contained" color="primary">
          {editExpense ? "Update Expense" : "Add Expense"}
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ marginTop: 2, width: "100%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Amount (₹)</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.length ? (
              expenses.map((exp) => (
                <TableRow key={exp._id}>
                  <TableCell>{exp.amount}</TableCell>
                  <TableCell>{exp.category}</TableCell>
                  <TableCell>{exp.description}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        setEditExpense(exp);
                        setForm(exp);
                        setEditDialogOpen(true);
                      }}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteExpense(exp._id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No expenses found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        color="primary"
        onClick={handleDownloadPDF}
        disabled={loading}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Download PDF"
        )}
      </Button>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Expense</DialogTitle>
        <DialogContent>
          <TextField
            name="amount"
            label="Amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            name="description"
            label="Description"
            value={form.description}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <MenuItem value="Expense">Expense</MenuItem>
              <MenuItem value="Income">Income</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveExpense} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
