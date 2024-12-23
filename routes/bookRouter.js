const { Router } = require("express");
const {
  getBooks,
  getBookId,
  getNewBook,
  bookError,
  postNewBook,
  getUpdateBook,
  postUpdateBook,
  getDeleteBook,
  postDeleteBook,
} = require("../controllers/bookController");
const bookRouter = Router();

bookRouter.get("/new", getNewBook);
bookRouter.post("/new", postNewBook);
bookRouter.get("/:bookId/update", getUpdateBook);
bookRouter.post("/:bookId/update", postUpdateBook);
bookRouter.get("/:bookId/delete", getDeleteBook);
bookRouter.post("/:bookId/delete", postDeleteBook);
bookRouter.get("/:bookId/view", getBookId);
bookRouter.get("/", getBooks);

bookRouter.use(bookError);

module.exports = bookRouter;
