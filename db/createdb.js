const { Client } = require("pg");
require("dotenv").config({ path: "../.env" });

const SQL = `
CREATE TABLE IF NOT EXISTS table_name (
  id SERIAL PRIMARY KEY,
  col_1 VARCHAR(255) NOT NULL
);
`;

const { PGSTRING } = process.env;

async function main() {
  console.log("Creating table...");

  const client = new Client({
    connectionString: PGSTRING,
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
