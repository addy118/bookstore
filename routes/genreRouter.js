const { Router } = require("express");
const {
  getGenres,
  genreError,
  getNewGenre,
  getUpdateGenre,
  postNewGenre,
  postUpdateGenre,
  getDeleteGenre,
  getGenreBooks,
  postDeleteGenre,
} = require("../controllers/genreController");
const genreRouter = Router();

genreRouter.get("/new", getNewGenre);
genreRouter.post("/new", postNewGenre);
genreRouter.get("/:genreId/update", getUpdateGenre);
genreRouter.post("/:genreId/update", postUpdateGenre);
genreRouter.get("/:genreId/delete", getDeleteGenre);
genreRouter.post("/:genreId/delete", postDeleteGenre);
genreRouter.get("/:genreId/books", getGenreBooks);
genreRouter.get("/", getGenres);

genreRouter.use(genreError);

module.exports = genreRouter;
