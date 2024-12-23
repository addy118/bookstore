const pool = require("./pool");

exports.insertGenre = async (name) => {
  await pool.query("INSERT INTO genres (name) VALUES (($1));", [name]);
};

exports.fetchGenres = async () => {
  const { rows } = await pool.query("SELECT * FROM genres ORDER BY genre_id;");
  return rows;
};

exports.fetchGenreIdByName = async (name) => {
  const { rows } = pool.query(
    "SELECT name genre_name FROM genres WHERE genre_id = ($1);",
    [name]
  );
  return rows[0];
};

exports.fetchGenreNameById = async (genreId) => {
  const { rows } = await pool.query(
    "SELECT name genre_name FROM genres WHERE genre_id = ($1);",
    [genreId]
  );
  return rows[0];
};

exports.fetchGenreBooksById = async (genreId) => {
  const { rows } = await pool.query(
    "SELECT b.book_id, b.title, b.author, g.name genre, b.price, b.stock FROM books b JOIN genres g ON b.genre_id = g.genre_id WHERE g.genre_id = ($1) ORDER BY b.book_id;",
    [genreId]
  );
  return rows;
};

exports.updateGenreNameById = async (name, genreId) => {
  await pool.query("UPDATE genres SET name = ($1) WHERE genre_id = ($2);", [
    name,
    genreId,
  ]);
};

exports.deleteGenreById = async (genreId) => {
  await pool.query("DELETE FROM genres WHERE genre_id = ($1);", [genreId]);
};

// INSERT INTO genres (name) VALUES (($1));

// all genres
// SELECT * FROM genres;

// genre id by name
// SELECT genre_id FROM genres WHERE name = ($1);

// genre name by id
// SELECT name genre_name FROM genres WHERE genre_id = ($1);

// genre with all books
// SELECT b.book_id, b.title, b.author, g.name genre, b.price, b.stock FROM books b JOIN genres g ON b.genre_id = g.genre_id WHERE g.genre_id = ($1) ORDER BY b.book_id;

// UPDATE genres SET name = ($1) WHERE genre_id = ($2);

// DELETE FROM genres WHERE genre_id = ($1);    // CAUTION DELETES ALL THE BOOKS OF THIS GENRE
