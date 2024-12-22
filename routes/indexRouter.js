const { Router } = require("express");
require("dotenv").config({ path: "../.env" });
const {
  getIndex,
  routeError,
  indexError,
} = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", getIndex);

// errors
indexRouter.use(routeError);
indexRouter.use(indexError);

module.exports = indexRouter;
