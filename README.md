# Expense Tracker

A full-stack Expense Tracker application built using **React.js** for the frontend and **Express.js with MongoDB** for the backend. The application allows users to manage their income and expenses efficiently with features like authentication, expense tracking, and PDF export.

## 🚀 Features

- **User Authentication** (Register/Login with JWT)
- **Expense Management** (Add, Delete, and List expenses with a summary)
- **Real-time Balance Calculation**
- **Export to PDF** (Handles large datasets)
- **Deployment Ready** (Backend on Render, Frontend on Vercel)
- **MongoDB Database Management** (Using Mongoose ORM)

## 🛠 Tech Stack

### Frontend
- React.js (Vite for faster development)
- Material UI (For sleek UI components)
- Axios (For API communication)
- React Context API (For state management)

### Backend
- Node.js & Express.js
- MongoDB (Mongoose ORM)
- JWT Authentication (JSON Web Token)
- CORS & Middleware Handling

## 📂 Project Setup

### 1️⃣ Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Narendrachillal/expense-tracker.git
   cd expense-tracker/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### 2️⃣ Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd ../client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend:
   ```bash
   npm run dev
   ```

## 🔥 Usage

1. **Register/Login** to access the dashboard.
2. **Add Income or Expenses** with a description and category.
3. **View Summary** including total income, expenses, and balance.
4. **Delete Transactions** when needed.
5. **Export Data to PDF** for record-keeping.




## 📜 License

This project is **open-source** and available under the **MIT License**.

---

💡 **Contributions are welcome!** Feel free to fork, open issues, or submit PRs to enhance the project.

Happy Coding! 🚀

