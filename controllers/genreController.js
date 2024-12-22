exports.getGenres = (req, res) => {
  res.send("genres route is working!");
};

exports.getGenreId = (req, res) => {
  const { genreId } = req.params;
  res.send("genre id: " + genreId);
};

exports.getNewGenre = (req, res) => {
  res.render("newGenre", { title: "New Genre" });
};

exports.postNewGenre = (req, res) => {
  const { name } = req.body;
  res.send(name);
};

exports.getUpdateGenre = (req, res) => {
  const { genreId } = req.body;
  res.render("updateGenre", { title: "Update Genre", genreId });
};

exports.postUpdateGenre = (req, res) => {
  const { name } = req.body;
  res.send(name);
};

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
