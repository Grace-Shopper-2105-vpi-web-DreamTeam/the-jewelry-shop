// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'jewelryshop'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;
const client = new Client(DB_URL);
//const client = new Client(process.env.DATABASE_URL || 'postgres://localhost:5432/fitness-dev');

// database methods

// export
module.exports = {
  client,
  // db methods
} 