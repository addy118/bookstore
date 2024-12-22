exports.getBooks = (req, res) => {
  res.send("books route is working!");
};

exports.getBookId = (req, res) => {
  const { bookId } = req.params;
  res.send("book id: " + bookId);
};

exports.getNewBook = (req, res) => {
  res.render("newBook", { title: "New Book" });
};

exports.postNewBook = (req, res) => {
  const { title, author, price, stock } = req.body;
  res.send(`${title}, ${author}`);
};

exports.getUpdateBook = (req, res) => {
  const { bookId } = req.body;
  res.render("updateBook", { title: "Update Book", bookId });
};

exports.postUpdateBook = (req, res) => {
  const { title, author, price, stock } = req.body;
  res.send(`${title} ${author}`);
};

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
