const { Router } = require("express");
const { getGenres } = require("../controllers/genreController");
const genreRouter = Router();

genreRouter.get("/", getGenres);

module.exports = genreRouter;
