const { body, validationResult } = require("express-validator");
const {
  fetchGenres,
  updateGenreNameById,
  insertGenre,
  fetchGenreBooksById,
  deleteGenreById,
  fetchGenreNameById,
} = require("../db/genreQueries");

const validateGenre = [
  body("name")
    .trim()
    .matches(/^[A-Za-z]+(?:[-\s][A-Za-z]+)*$/)
    .withMessage(
      "Genre name should only contain letters, hyphens, and single spaces"
    )
    .isLength({ min: 2, max: 30 })
    .withMessage("Genre name must be between 2 and 16"),
];

exports.getGenres = async (req, res) => {
  const genres = await fetchGenres();
  res.render("genres", {
    title: "Genres",
    genres,
  });
};

exports.getGenreBooks = async (req, res) => {
  const { genreId } = req.params;
  const genreName = await fetchGenreNameById(genreId);
  const books = await fetchGenreBooksById(genreId);
  res.render("genreBooks", { title: "Genre Books", books, genreName, genreId });
};

exports.getNewGenre = (req, res) => {
  res.render("newGenre", {
    title: "New Genre",
  });
};

exports.postNewGenre = [
  validateGenre,
  async (req, res) => {
    // validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("newGenre", {
        title: "New Genre",
        errors: errors.array(),
      });
    }

    // route handler
    const { name } = req.body;
    await insertGenre(name);
    res.redirect("/genres");
  },
];

exports.getUpdateGenre = (req, res) => {
  const { genreId } = req.params;
  res.render("updateGenre", { title: "Update Genre", genreId: genreId });
};

exports.postUpdateGenre = [
  validateGenre,
  async (req, res) => {
    const { genreId } = req.params;

    // validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("updateGenre", {
        title: "Update Genre",
        genreId: genreId,
        errors: errors.array(),
      });
    }

    // route handler
    const { name } = req.body;
    await updateGenreNameById(name, genreId);
    res.redirect("/genres");
  },
];

exports.getDeleteGenre = async (req, res) => {
  const { genreId } = req.params;
  const books = await fetchGenreBooksById(genreId);
  res.render("deleteGenre", { title: "Delete Genre", books, genreId });
};

exports.postDeleteGenre = async (req, res) => {
  const { genreId } = req.params;
  await deleteGenreById(genreId);
  // console.log("deleted genre!");
  res.redirect("/genres");
};

exports.genreError = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).render("customError", {
    title: "Error",
    file: "Genre Router",
    error: err.message,
  });
};
