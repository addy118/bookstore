const { fetchGenreIdByName } = require("./genreQueries");
const pool = require("./pool");

exports.insertBook = async (title, author, genre, price, stock) => {
  const genre_id = await fetchGenreIdByName();
  await pool.query(
    "INSERT INTO books (genre_id, title, author, price, stock) VALUES (($1), ($2), ($3), ($4), ($5));",
    [genre_id, title, author, price, stock]
  );
};

exports.fetchBooks = async () => {
  const { rows } = await pool.query(
    "SELECT b.book_id, b.title, b.author, g.name genre, b.price, b.stock FROM books b JOIN genres g ON b.genre_id = g.genre_id;"
  );
  return rows;
};

exports.fetchBookById = async (bookId) => {
  const { rows } = await pool.query(
    "SELECT b.book_id, b.title, b.author, g.name genre, b.price, b.stock FROM books b JOIN genres g ON b.genre_id = g.genre_id WHERE b.book_id = ($1);",
    [bookId]
  );
  return rows[0];
};

exports.updateBookTitleById = async (value, bookId) => {
  await pool.query("UPDATE books SET title = ($1) WHERE book_id = ($2);", [
    value,
    bookId,
  ]);
};

exports.updateBookAuthorById = async (value, bookId) => {
  await pool.query("UPDATE books SET author = ($1) WHERE book_id = ($2);", [
    value,
    bookId,
  ]);
};

exports.updateBookGenreById = async (value, bookId) => {
  await pool.query("UPDATE books SET genre_id = ($1) WHERE book_id = ($2);", [
    value,
    bookId,
  ]);
};

exports.updateBookPriceById = async (value, bookId) => {
  await pool.query("UPDATE books SET price = ($1) WHERE book_id = ($2);", [
    value,
    bookId,
  ]);
};

exports.updateBookStockById = async (value, bookId) => {
  await pool.query("UPDATE books SET stock = ($1) WHERE book_id = ($2);", [
    value,
    bookId,
  ]);
};

exports.deleteBookById = async (bookId) => {
  await pool.query("DELETE FROM books WHERE book_id = ($1);", [bookId]);
};

// INSERT INTO books (genre_id, title, author, price, stock) VALUES (($1), ($2), ($3), ($4), ($5));

// book obj with all attributes
// SELECT b.book_id, b.title, b.author, g.name genre, b.price, b.stock FROM books b JOIN genres g ON b.genre_id = g.genre_id;

// book obj of selected id
// SELECT b.book_id, b.title, b.author, g.name genre, b.price, b.stock FROM books b JOIN genres g ON b.genre_id = g.genre_id WHERE b.book_id = ($1);

// UPDATE books SET genre_id = ($1) WHERE book_id = ($2);
// UPDATE books SET title = ($1) WHERE book_id = ($2);
// UPDATE books SET author = ($1) WHERE book_id = ($2);
// UPDATE books SET price = ($1) WHERE book_id = ($2);
// UPDATE books SET stock = ($1) WHERE book_id = ($2);

// DELETE FROM books WHERE book_id = ($1);
