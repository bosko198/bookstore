const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const paymentRoutes = require("./routes/payment");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/payment", paymentRoutes);

// Simple test route
app.get("/", (req, res) => {
  res.send("Bookstore API is running...");
});

// Import routes
const bookRoutes = require("./routes/books");
app.use("/api/books", bookRoutes);

// Connect to MongoDB
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));