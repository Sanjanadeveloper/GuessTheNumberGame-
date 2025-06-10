const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// Middleware
// app.use(cors());
app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

// Routes
app.get("/test", (req, res) => {
  res.send("Guess the Number Game API is running...");
});



// Import Routes (we’ll create them next)
const authRoutes = require("./routes/authRoutes");
const gameRoutes = require("./routes/gameRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/game", gameRoutes);

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
