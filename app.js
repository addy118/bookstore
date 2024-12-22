const express = require("express");
const path = require("path");
require("dotenv").config();
const bookRouter = require("./routes/bookRouter");
const genreRouter = require("./routes/genreRouter");
const { appError, routeError, getApp } = require("./controllers/appController");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use("/books", bookRouter);
app.use("/genres", genreRouter);
app.use("/", getApp);

app.use(routeError);
app.use(appError);

const { PORT = 8080 } = process.env;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
