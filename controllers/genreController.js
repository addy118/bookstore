const { body, validationResult } = require("express-validator");
const { fetchGenres } = require("../db/genreQueries");

const validateGenre = [
  body("name")
    .trim()
    .isAlpha()
    .withMessage("Genre name should only contain letters")
    .isLength({ min: 2, max: 16 })
    .withMessage("Genre name must be between 2 and 16"),
];

exports.getGenres = async (req, res) => {
  const genres = await fetchGenres();
  res.send(genres);
};

exports.getGenreId = (req, res) => {
  const { genreId } = req.params;
  res.send("genre id: " + genreId);
};

exports.getNewGenre = (req, res) => {
  res.render("newGenre", {
    title: "New Genre",
  });
};

exports.postNewGenre = [
  validateGenre,
  (req, res) => {
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
    console.log(name);
    res.redirect("/genres");
  },
];

exports.getUpdateGenre = (req, res) => {
  const { genreId } = req.params;
  res.render("updateGenre", { title: "Update Genre", genreId: genreId });
};

exports.postUpdateGenre = [
  validateGenre,
  (req, res) => {
    const { genreId } = req.params;

    // validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).render("updateGenre", {
        title: "Update Genre",
        genreId: genreId,
        errors: errors.array(),
      });
    }

    // route handler
    const { name } = req.body;
    res.send(name);
  },
];

exports.getDeleteGenre = (req, res) => {
  res.send("Are you sure you wanna delete this genre?");
};

exports.genreError = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).render("customError", {
    title: "Error",
    file: "Genre Router",
    error: err.message,
  });
};
