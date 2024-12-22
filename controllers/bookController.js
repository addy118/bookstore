const { body, validationResult } = require("express-validator");
const { fetchBooks } = require("../db/bookQueries");

const validateBook = [
  body("title")
    .trim()
    .isAlpha()
    .withMessage("Title should be alphabetic")
    .isLength({ min: 2, max: 30 })
    .withMessage("Title should be within 2 and 30 characters"),
  body("author")
    .trim()
    .isAlpha()
    .withMessage("Title should only contain letters")
    .isLength({ min: 2, max: 15 })
    .withMessage("Title should be within 2 and 15 characters"),
  body("price")
    .trim()
    .isInt({ min: 1, allow_leading_zeroes: false })
    .withMessage("Price should contain only numbers"),
  body("stock")
    .trim()
    .isInt({ min: 1, allow_leading_zeroes: false })
    .withMessage("Stock should contain only numbers"),
];

exports.getBooks = async (req, res) => {
  const books = await fetchBooks();
  res.send(books);
};

exports.getBookId = (req, res) => {
  const { bookId } = req.params;
  res.send("book id: " + bookId);
};

exports.getNewBook = (req, res) => {
  res.render("newBook", { title: "New Book" });
};

exports.postNewBook = [
  validateBook,
  (req, res) => {
    // validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("newBook", {
        title: "New Book",
        errors: errors.array(),
      });
    }

    // route handler
    const { title, author, price, stock } = req.body;
    console.log(title, author, price, stock);
    res.redirect("/books");
  },
];

exports.getUpdateBook = (req, res) => {
  const { bookId } = req.params;
  res.render("updateBook", { title: "Update Book", bookId: bookId });
};

exports.postUpdateBook = [
  validateBook,
  (req, res) => {
    const { bookId } = req.params;

    // validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("updateBook", {
        title: "Update Book",
        bookId: bookId,
        errors: errors.array(),
      });
    }

    // route handler
    const { title, author, price, stock } = req.body;
    console.log(title, author, price, stock);
    res.redirect("/books");
  },
];

exports.getDeleteBook = (req, res) => {
  res.send("Are you sure you wanna delete the book?");
};

exports.bookError = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).render("customError", {
    title: "Error",
    file: "Book Router",
    error: err.message,
  });
};
