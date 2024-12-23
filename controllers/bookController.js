const { body, validationResult } = require("express-validator");
const {
  fetchBooks,
  fetchBookById,
  updateBookAuthorById,
  updateBookTitleById,
  updateBookGenreById,
  updateBookPriceById,
  updateBookStockById,
} = require("../db/bookQueries");
const { fetchGenres, fetchGenreIdByName } = require("../db/genreQueries");

const validateBook = [
  body("title")
    .trim()
    .matches(/^[A-Za-z]+(?:[-\s][A-Za-z]+)*$/)
    .withMessage(
      "Title should only contain letters, hyphens, and single spaces"
    )
    .isLength({ min: 2, max: 80 })
    .withMessage("Title should be within 2 and 30 characters"),
  body("author")
    .trim()
    .matches(/^[A-Za-z]+(?:[-\s][A-Za-z]+)*$/)
    .withMessage(
      "Author should only contain letters, hyphens, and single spaces"
    )
    .isLength({ min: 2, max: 30 })
    .withMessage("Author should be within 2 and 15 characters"),
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
  res.render("books", { title: "Books", books });
};

exports.getBookId = async (req, res) => {
  const { bookId } = req.params;
  const book = await fetchBookById(bookId);
  console.log(book);
  res.render("book", {
    title: "View Book",
    book,
  });
};

exports.getNewBook = async (req, res) => {
  const genres = await fetchGenres();
  res.render("newBook", { title: "New Book", genres });
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

exports.getUpdateBook = async (req, res) => {
  const { bookId } = req.params;
  const genres = await fetchGenres();
  const book = await fetchBookById(bookId);
  const old_genre = book.genre;
  res.render("updateBook", { title: "Update Book", book, genres, old_genre });
};

exports.postUpdateBook = [
  validateBook,
  async (req, res) => {
    const { bookId } = req.params;
    const genres = await fetchGenres();
    const book = await fetchBookById(bookId);
    const old_genre = book.genre;

    // validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("updateBook", {
        title: "Update Book",
        book,
        genres,
        old_genre,
        errors: errors.array(),
      });
    }

    // route handler
    const { title, genre, author, price, stock } = req.body;
    const genre_id = await fetchGenreIdByName(genre);
    // console.log(title, genre_id, author, price, stock);
    await updateBookTitleById(title, bookId);
    await updateBookAuthorById(author, bookId);
    await updateBookGenreById(genre_id, bookId);
    await updateBookPriceById(price, bookId);
    await updateBookStockById(stock, bookId);
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
