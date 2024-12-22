exports.getIndex = (req, res) => {
  res.render("home", { title: "Home" });
};

exports.routeError = (req, res) => {
  res
    .status(500)
    .render("notFound");
};

exports.indexError = (err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .render("customError", {
      title: "Error",
      file: "Index Router",
      error: err.message,
    });
};
