const { fetchGenres } = require("../db/genreQueries");

exports.getApp = async (req, res) => {
  const genres = await fetchGenres();
  res.render("home", { title: "Home", genres });
};

exports.routeError = (req, res) => {
  res.status(500).render("notFound");
};

exports.appError = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).render("customError", {
    title: "Error",
    file: "Index Router",
    error: err.message,
  });
};
