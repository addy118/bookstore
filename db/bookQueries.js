const pool = require("./pool");

exports.fetchBooks = async (req, res) => {
  const { rows } = await pool.query("select * from books;");
  return rows;
};
