const { Client } = require('pg');
require('dotenv').config({ path: '../.env' });

const SQL = `
INSERT INTO (col_1, col_2)
VALUES 
('value1', 'value2')
`;

const { PGSTRING } = process.env;

async function main() {
  console.log('Seeding table...');

  const client = new Client({
    connectionString: PGSTRING,
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log('Table seeded successfully.');
  } catch (err) {
    console.error('Error seeding table:', err);
  } finally {
    await client.end();
  }
}

main();