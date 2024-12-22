const pool = require("./pool");

exports.fetchGenres = async (req, res) => {
  const { rows } = await pool.query("select * from genres;");
  return rows;
};
