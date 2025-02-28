import { useState, useEffect } from "react";
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Expense");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");

  // Fetch expenses
  const fetchExpenses = async () => {
    if (!token) return console.error("No token found in localStorage!");

    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/expenses/get",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setExpenses(data);
    } catch (error) {
      console.error("Fetch Error:", error.response?.data || error);
      alert(error.response?.data?.message || "Error fetching expenses");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [token]);

  // Add expense
  const addExpense = async () => {
    try {
      if (!token) return;
      if (!amount || !category || !description)
        return alert("Missing fields, Please fill all  section");
      await axios.post(
        "http://localhost:5000/api/expenses/add",
        { amount, category, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchExpenses();
      setAmount("");
      setDescription("");
      setCategory("");
    } catch (error) {
      alert("Error adding expense");
      console.error(error);
    }
  };

  // Delete expense
  const deleteExpense = async (id) => {
    if (!token) return;
    try {
      await axios.delete(`http://localhost:5000/api/expenses/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchExpenses();
    } catch (error) {
      alert("Error deleting expense");
      console.error(error);
    }
  };
  const handleDownloadPDF = async () => {
    try {
      const token = localStorage.getItem("token"); // Get JWT token from storage

      if (!token) {
        alert("You must be logged in to download the report.");
        return;
      }

      const response = await axios.get(
        "http://localhost:5000/api/expenses/export-pdf", // Update with your backend URL
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token in headers
          },
          responseType: "blob", // Get binary data
        }
      );

      // Create a downloadable PDF file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expenses.pdf"); // Set filename
      document.body.appendChild(link);
      link.click(); // Trigger download
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert(error.response?.data?.message || "Error downloading the PDF");
    }
  };

  // Calculate totals
  const totalIncome = expenses
    .filter((exp) => exp.category === "Income")
    .reduce((acc, exp) => acc + exp.amount, 0);

  const totalExpenses = expenses
    .filter((exp) => exp.category === "Expense")
    .reduce((acc, exp) => acc + exp.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <Container>
      {/* Summary Section */}
      <Paper
        elevation={3}
        sx={{ padding: 2, marginBottom: 2, textAlign: "center" }}
      >
        <Typography variant="h6">Summary</Typography>
        <Typography>Total Income: ₹{totalIncome}</Typography>
        <Typography>Total Expenses: ₹{totalExpenses}</Typography>
        <Typography variant="h6" color={balance >= 0 ? "green" : "red"}>
          Balance: ₹{balance}
        </Typography>
      </Paper>

      {/* Input Fields */}
      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <MenuItem value="Expense">Expense</MenuItem>
          <MenuItem value="Income">Income</MenuItem>
        </Select>
      </FormControl>
      <Button
        onClick={addExpense}
        variant="contained"
        color="primary"
        fullWidth
      >
        Add Expense
      </Button>

      {/* Expense Table */}
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
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
            {expenses.length > 0 ? (
              expenses.map((exp) => (
                <TableRow key={exp._id}>
                  <TableCell>{exp.amount}</TableCell>
                  <TableCell>{exp.category}</TableCell>
                  <TableCell>{exp.description}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => deleteExpense(exp._id)}
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
        sx={{ mt: 2 }}
      >
        Download PDF Report
      </Button>
    </Container>
  );
};

export default Dashboard;
