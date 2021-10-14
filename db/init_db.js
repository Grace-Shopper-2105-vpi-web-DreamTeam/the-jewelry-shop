// code to build and initialize DB goes here
const {
  client
  // other db methods 
} = require('./index');

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    console.log('Dropping all tables...');

    client.query(`
    DROP TABLE IF EXISTS order_item;
    DROP TABLE IF EXISTS cart_item;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS cart;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS users;
    `);

    console.log('Finished dropping tables!');
    // build tables in correct order
    console.log('Starting to build tables...');

    await client.query(`
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      "emailAddress" VARCHAR(255) UNIQUE NOT NULL,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      "isAdmin" BOOLEAN DEFAULT false
    );
    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) UNIQUE NOT NULL,
      description TEXT NOT NULL,
      price DECIMAL(19, 4),
      inventory INTEGER,
      image BYTEA(max)
    );
    CREATE TABLE cart(
      id SERIAL PRIMARY KEY,
      "userId" REFERENCES users(id),
      "productId" REFERENCES products(id),
      quantity INTEGER,
      "isCheckedOut" BOOLEAN DEFAULT false REFERENCES orders(id)
    );
    CREATE TABLE orders(
      id SERIAL PRIMARY KEY, 
      "userId" REFERENCES users(id)
      total DECIMAL(19, 4)
    );
    CREATE TABLE cart_item(
      id SERIAL PRIMARY KEY,
      "cartId" REFERENCES cart(id)
      "productId" REFERENCES products(id),
      quantity INTEGER
    );
    CREATE TABLE order_item(
      id SERIAL PRIMARY KEY,
      "orderId" REFERENCES orders(id),
      "productId" REFERENCES products(id),
      quantity INTEGER
    )
    `)

    console.log('Finished constructing tables!');
  } catch (error) {
    console.error('Error constructing tables!');

    throw new Error("error while making the tables!")
  }
}

async function createInitialUsers() {
  console.log('Starting to create users...');
  try {

    const usersToCreate = [
      {username: 'greg', password: 'greg123' },
      {username: 'albert', password: 'bertie99'},
    ]
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());