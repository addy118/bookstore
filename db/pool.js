const { Pool } = require("pg");
require("dotenv").config();

const { PGSTRING } = process.env;
module.exports = new Pool({ connectionString: PGSTRING });
