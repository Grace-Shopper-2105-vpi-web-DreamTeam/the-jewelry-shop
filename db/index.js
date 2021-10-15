// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'jewelryshop'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${ DB_NAME }`;
const client = new Client(DB_URL);

// database methods

const {
  createProduct,
  getAllProducts,
  getProductById,
  getProductByCatagoty,
  updateProduct,
  deleteProduct
} = require("./products")

// export
module.exports = {
  client,
  createProduct,
  getAllProducts,
  getProductById,
  getProductByCatagoty,
  updateProduct,
  deleteProduct
} 