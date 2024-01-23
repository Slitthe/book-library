const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// This will store our books in memory,
// "id" is the unique identifier,
// other fields are up to you
let books = [];

// Get all books
app.get("/books", async (req, res) => {
  await new Promise((res) => setTimeout(() => res(), 2000));

  if(Math.random() > 0.7) {
    res.status(500).send("");
    return;
  }

  console.log({books});
  res.json(books);
});

// Add a new book
app.post("/books", async (req, res) => {
  await new Promise((res) => setTimeout(() => res(), 2000));
  if(Math.random() > 0.7) {
    res.status(500).send("");
    return;
  }
  const book = { id: Date.now(), ...req.body };
  books.push(book);
  res.status(201).json(book);
});

// Update a book
app.put("/books/:id", async (req, res) => {
  await new Promise((res) => setTimeout(() => res(), 2000));
  if(Math.random() > 0.7) {
    res.status(500).send("");
    return;
  }
  const index = books.findIndex((book) => book.id === parseInt(req.params.id));
  if (index >= 0) {
    books[index] = { ...books[index], ...req.body };
    res.json(books[index]);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// Delete a book
app.delete("/books/:id", async (req, res) => {
  await new Promise((res) => setTimeout(() => res(), 2000));
  if(Math.random() > 0.7) {
    res.status(500).send("");
    return;
  }
  console.log({params: req.params})
  books = books.filter((book) => book.id !== parseInt(req.params.id));
  res.status(204).send();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
