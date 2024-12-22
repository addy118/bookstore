const { Client } = require("pg");
require("dotenv").config({ path: "../.env" });

const SQL = `
INSERT INTO genres (name) VALUES 
  ('Science Fiction'),
  ('Fantasy'),
  ('Mystery'),
  ('Romance'),
  ('Historical Fiction');

INSERT INTO books (genre_id, title, author, price, stock) VALUES 
  (1, 'Dune', 'Frank Herbert', 1499, 50),
  (1, 'The Left Hand of Darkness', 'Ursula K. Le Guin', 1299, 30),
  (1, 'Neuromancer', 'William Gibson', 1599, 40),
  (1, 'Foundation', 'Isaac Asimov', 1699, 60),
  (1, 'The Hitchhikers Guide to the Galaxy', 'Douglas Adams', 1299, 80),
  (2, 'The Hobbit', 'J.R.R. Tolkien', 999, 100),
  (2, 'Harry Potter and the Sorcerers Stone', 'J.K. Rowling', 799, 200),
  (2, 'A Game of Thrones', 'George R.R. Martin', 1399, 120),
  (2, 'The Name of the Wind', 'Patrick Rothfuss', 1199, 150),
  (2, 'Mistborn: The Final Empire', 'Brandon Sanderson', 1499, 200),
  (3, 'The Girl with the Dragon Tattoo', 'Stieg Larsson', 1299, 80),
  (3, 'Gone Girl', 'Gillian Flynn', 899, 120),
  (3, 'The Silent Patient', 'Alex Michaelides', 1399, 60),
  (3, 'Big Little Lies', 'Liane Moriarty', 1099, 90),
  (3, 'Sharp Objects', 'Gillian Flynn', 1199, 70),
  (4, 'Pride and Prejudice', 'Jane Austen', 1099, 60),
  (4, 'The Fault in Our Stars', 'John Green', 1299, 150),
  (4, 'Me Before You', 'Jojo Moyes', 899, 130),
  (4, 'The Notebook', 'Nicholas Sparks', 999, 110),
  (5, 'The Book Thief', 'Markus Zusak', 1399, 75),
  (5, 'All the Light We Cannot See', 'Anthony Doerr', 1499, 40);
`;

const { PGSTRING } = process.env;

async function main() {
  console.log("Seeding table...");

  const client = new Client({
    connectionString: PGSTRING,
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log("Table seeded successfully.");
  } catch (err) {
    console.error("Error seeding table:", err);
  } finally {
    await client.end();
  }
}

main();
