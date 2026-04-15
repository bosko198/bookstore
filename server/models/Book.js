const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, enum: ["personal", "public", "licensed"], required: true },
  fileUrl: { type: String }, // link to PDF/ePub file
  price: { type: Number, default: 0 }, // 0 for free public domain
  coverUrl: { type: String },
});

module.exports = mongoose.model("Book", bookSchema);