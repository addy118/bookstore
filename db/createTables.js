const { Client } = require("pg");
require("dotenv").config({ path: "../.env" });

const SQL = `
CREATE TABLE IF NOT EXISTS genres (
  genre_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
  name VARCHAR(255) NOT NULL
);
`;
// CREATE TABLE IF NOT EXISTS books (
//   book_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
//   genre_id INTEGER NOT NULL,  -- defining the genre_id column
//   title VARCHAR(255) NOT NULL,
//   author VARCHAR(255) NOT NULL,
//   price MONEY NOT NULL,
//   stock INTEGER NOT NULL,
// 
//   CONSTRAINT fk_genre FOREIGN KEY (genre_id) REFERENCES genres (genre_id)
//   ON DELETE CASCADE 
//   ON UPDATE CASCADE 
// );

const DATABASE_URL = process.env.DATABASE_URL;

async function main() {
  console.log("Creating table...");

  const client = new Client({
    connectionString: DATABASE_URL,
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log("Table created successfully.");
  } catch (err) {
    console.error("Error creating table:", err);
  } finally {
    await client.end();
  }
}

main();
