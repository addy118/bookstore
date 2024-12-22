const express = require("express");
const path = require("path");
require("dotenv").config();
const indexRouter = require("./routes/indexRouter");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

const { PORT } = process.env;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
