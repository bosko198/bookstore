const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const isAdmin = require("../middleware/admin");
const multer = require("multer");
const path = require("path");

// Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get books by category
router.get("/category/:type", async (req, res) => {
  try {
    const { type } = req.params;
    const books = await Book.find({ category: type });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/seed", async (req, res) => {
  try {
    await Book.deleteMany(); // clear duplicates

    const sampleBooks = [
      {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        category: "public",
        price: 0,
        fileUrl: "https://www.gutenberg.org/files/1342/1342-h/1342-h.htm",
        coverUrl: "https://covers.openlibrary.org/b/id/8231856-L.jpg"
      },
      {
        title: "Hamlet",
        author: "William Shakespeare",
        category: "public",
        price: 0,
        fileUrl: "https://www.gutenberg.org/files/1524/1524-h/1524-h.htm",
        coverUrl: "https://covers.openlibrary.org/b/id/6979862-L.jpg"
      },
      {
        title: "A Tale of Two Cities",
        author: "Charles Dickens",
        category: "public",
        price: 0,
        fileUrl: "https://www.gutenberg.org/files/98/98-h/98-h.htm",
        coverUrl: "https://covers.openlibrary.org/b/id/7222246-L.jpg"
      },
      {
        title: "The Adventures of Sherlock Holmes",
        author: "Arthur Conan Doyle",
        category: "public",
        price: 0,
        fileUrl: "https://www.gutenberg.org/files/1661/1661-h/1661-h.htm",
        coverUrl: "https://covers.openlibrary.org/b/id/8226191-L.jpg"
      },
      {
        title: "Moby Dick",
        author: "Herman Melville",
        category: "public",
        price: 0,
        fileUrl: "https://www.gutenberg.org/files/2701/2701-h/2701-h.htm",
        coverUrl: "https://covers.openlibrary.org/b/id/8100925-L.jpg"
      },
      {
        title: "Frankenstein",
        author: "Mary Shelley",
        category: "public",
        price: 0,
        fileUrl: "https://www.gutenberg.org/files/84/84-h/84-h.htm",
        coverUrl: "https://covers.openlibrary.org/b/id/8235116-L.jpg"
      },

      // --- Personal Demo Books ---
      {
        title: "My First Novel",
        author: "Bozhidar",
        category: "personal",
        price: 5,
        fileUrl: "https://example.com/my-first-novel.pdf",
        coverUrl: "https://placehold.co/150x200?text=My+First+Novel"
      },
      {
        title: "Coding Adventures",
        author: "Bozhidar",
        category: "personal",
        price: 7,
        fileUrl: "https://example.com/coding-adventures.pdf",
        coverUrl: "https://placehold.co/150x200?text=Coding+Adventures"
      },
      {
        title: "Portfolio Secrets",
        author: "Bozhidar",
        category: "personal",
        price: 10,
        fileUrl: "https://example.com/portfolio-secrets.pdf",
        coverUrl: "https://placehold.co/150x200?text=Portfolio+Secrets"
      },
      {
        title: "React Mastery",
        author: "Bozhidar",
        category: "personal",
        price: 12,
        fileUrl: "https://example.com/react-mastery.pdf",
        coverUrl: "https://placehold.co/150x200?text=React+Mastery"
      },
      {
        title: "MongoDB for Beginners",
        author: "Bozhidar",
        category: "personal",
        price: 8,
        fileUrl: "https://example.com/mongodb-beginners.pdf",
        coverUrl: "https://placehold.co/150x200?text=MongoDB+Beginners"
      },
      {
        title: "Express.js in Action",
        author: "Bozhidar",
        category: "personal",
        price: 9,
        fileUrl: "https://example.com/expressjs-in-action.pdf",
        coverUrl: "https://placehold.co/150x200?text=Express.js+in+Action"
      }

    ];

    await Book.insertMany(sampleBooks);
    res.send("Sample public domain books linked!");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });


// Add a new book

router.post(
  "/",
  isAdmin,
  upload.fields([{ name: "file", maxCount: 1 }, { name: "cover", maxCount: 1 }]),
  async (req, res) => {
    try {
      const newBook = new Book({
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        price: req.body.price,
        fileUrl: req.files["file"] ? req.files["file"][0].path : null,
        coverUrl: req.files["cover"] ? req.files["cover"][0].path : null
      });
      await newBook.save();
      res.status(201).json(newBook);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);


module.exports = router;