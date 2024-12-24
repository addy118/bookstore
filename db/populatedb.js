const { Client } = require("pg");
require("dotenv").config({ path: "../.env" });

const SQL = `
INSERT INTO books (genre_id, title, author, price, stock) VALUES
(8, 'IT', 'Stephen King', 1699, 50),
(8, 'Dracula', 'Bram Stoker', 1199, 60),
(8, 'The Haunting of Hill House', 'Shirley Jackson', 1299, 70),
(8, 'Pet Sematary', 'Stephen King', 1499, 40),
(9, 'The Girl on the Train', 'Paula Hawkins', 1399, 80),
(9, 'The Da Vinci Code', 'Dan Brown', 1499, 90),
(9, 'Gone Tomorrow', 'Lee Child', 1299, 100),
(9, 'Before I Go to Sleep', 'S.J. Watson', 1199, 50),
(10, 'All the Light We Cannot See', 'Anthony Doerr', 1699, 60),
(10, 'The Book Thief', 'Markus Zusak', 1299, 70),
(10, 'Pillars of the Earth', 'Ken Follett', 1999, 40),
(10, 'Wolf Hall', 'Hilary Mantel', 1599, 50),
(11, 'The Diary of a Young Girl', 'Anne Frank', 999, 120),
(11, 'Becoming', 'Michelle Obama', 1699, 80),
(11, 'Steve Jobs', 'Walter Isaacson', 1499, 60),
(11, 'Educated', 'Tara Westover', 1299, 70),
(12, 'The Power of Habit', 'Charles Duhigg', 1199, 90),
(12, 'Atomic Habits', 'James Clear', 1499, 150),
(12, 'How to Win Friends and Influence People', 'Dale Carnegie', 999, 200),
(12, 'The Subtle Art of Not Giving a F*ck', 'Mark Manson', 1299, 110);
`;

const DATABASE_URL = process.env.DATABASE_URL;

async function main() {
  console.log("Seeding table...");

  const client = new Client({
    connectionString: DATABASE_URL,
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
