// code to build and initialize DB goes here
const { bindComplete } = require('pg-protocol/dist/messages');

const {
  client
} = require('./index');
const {
  createUser, 
  getAllUsers
} = require('./users')

const {
  getAllOrders,
  createOrder,
  getOrderByUserId
} = require('./orders')

const {
  addOrderItemToOrder
} = require('./orderItems')

const {
  createProduct, 
  getAllProducts,
  getAllActiveProducts, 
  getProductById, 
  getProductByCategory, 
  updateProduct,
  deleteProduct,
  deactivateProduct
} = require("./products");

async function dropTables() {
  try {
      // drop tables in correct order
    console.log('Dropping all tables...');
    await client.query(`
    DROP TABLE IF EXISTS order_item;
    DROP TABLE IF EXISTS cart_item;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS cart;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS users;
    `);
    
    console.log('Finished dropping tables!');
  } catch (error) {
    console.log('error dropping tables!');
    throw error; // we pass the error up to the function that calls dropTables
  }
}

async function buildTables() {
  try {
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
     CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        category VARCHAR(255) NOT NULL,
        price DECIMAL(19, 4),
        inventory INTEGER,
        "isActive" BOOLEAN DEFAULT true
      );
    `);

    //image BYTEA(max) NOT NULL
    await client.query(`
    CREATE TABLE orders(
      id SERIAL PRIMARY KEY, 
      "userId" INTEGER REFERENCES users(id),
      total DECIMAL(19, 4)
    );
    `)
    //had to remove but there is an error... not sure what?    "isCheckedOut" BOOLEAN DEFAULT false REFERENCES orders(id)
    await client.query(`
    CREATE TABLE cart(
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      total DECIMAL(19, 4),
      quantity INTEGER
    );
    
    CREATE TABLE cart_item(
      id SERIAL PRIMARY KEY,
      "cartId" INTEGER REFERENCES cart(id),
      "productId" INTEGER REFERENCES products(id),
      quantity INTEGER,
      price DECIMAL(19, 4) 
    );
    CREATE TABLE order_item(
      id SERIAL PRIMARY KEY,
      "orderId" INTEGER REFERENCES orders(id),
      "productId" INTEGER REFERENCES products(id),
      quantity INTEGER
    )
    `)

    console.log('Finished constructing tables!');
  } catch (error) {
    console.error('Error constructing tables!', error);

    throw new Error("error while making the tables!")
  }
}

async function createInitialUsers() {
  console.log('Starting to create users...');
  try {
    const usersToCreate = [
      {emailAddress: "greg123@gmail.com", username: 'greg', password: 'greg123' },
      {emailAddress: "albert123@gmail.com", username: 'albert', password: 'bertie99'},
      {emailAddress: "glamgal123@gmail.com", username: 'glamgal', password: 'glamgal123'},
      {emailAddress: "griffb@gmail.com", username: 'griff', password: 'worstleagueplayer7'},
      {emailAddress: "jacksons@gmail.com", username: 'jackson', password: 'edm4evur'},
      {emailAddress: "admin123@gmail.com", username: 'admin1', password: 'admin123', isAdmin: true},
    ]

    const users = await Promise.all(usersToCreate.map(createUser));
    console.log('Users created:');
    console.log(users);
    console.log('Finished creating users!');
  } catch (error) {
    console.error('Error creating users!');
    throw error;
  }
}

async function createInitialProducts() {
  console.log('Starting to create products...');
  try {
    const productsToCreate = [
      {title: 'Rolex Submariner', description: 'black dial arabic numerals classic design', category: 'watches', price: '8252.97', inventory: 3},
      {title: 'Medical ID Bracelet', description: 'Basic stainless steel bracelet with custom name and medical information', category: 'bracelets', price: '50.99', inventory: 5000},
      {title: '"B" Necklace', description: 'Stylish stainless steel necklace with a "B" pendant', category: 'necklaces', price: '129.99', inventory: 352},
      {title: 'Beaded Bracelet Set', description: 'Set of 5 different beaded bracelets', category: 'bracelets', price: '29.99', inventory: 26},
      {title: 'Diamond Earrings', description: 'Beautiful, simple set of diamond earrings', category: 'earrings', price: '999.99', inventory: 43, isActive: true},
      {title: 'Diamond Drop Earrings', description: 'Delicate drop diamond earrings, limited edition', category: 'earrings', price: '1999.99', inventory: 23, isActive: false},
    ]

    //const watch = await createProduct({title: 'Medical ID Bracelet', description: 'Basic stainless steel bracelet with custom name and medical information', category: 'bracelets', price: '50.99', inventory: 5000})
    const products = await Promise.all(productsToCreate.map(createProduct));
    console.log('Products created:');
    console.log(products);
    console.log('Finished creating products!');
  } catch (error) {
    console.error('Error creating products!');
    throw error;
  }
}

async function createInitialCarts() {
  console.log('Starting to create carts...');
  try {
    const cartsToCreate = [
      {userId: 1},
      {userId: 2},
      {userId: 3},
      {userId: 4},
      {userId: 5},
      {userId: 6}
    ]
    
    const carts = await Promise.all(cartsToCreate.map(createCart));
    console.log('Carts created: ', carts);
    console.log('Finished creating carts!')
  } catch (error) {
    console.error('Error creating carts!');
    throw error;
  }
}

async function createInitialOrders() {
  console.log('Starting to create orders...');
  try {
    const ordersToCreate = [
      {userId: 1},
      {userId: 2},
      {userId: 1},
      {userId: 3},
      {userId: 5},
      {userId: 4}
    ]

    const orders = await Promise.all(ordersToCreate.map(createOrder));
  } catch (error) {
    console.error('Error creating orders!');
    throw error;
  }
}

async function createInitialOrderItems() {
  console.log('Starting to create order items...');
  try {
    const orderItemsToCreate = [
      {
        orderId: 1,
        productId: 4,
        quantity: 2
      },
      {
        orderId: 1, 
        productId: 2, 
        quantity: 1
      },
      {
        orderId: 2,
        productId: 4,
        quantity: 3
      },
      {
        orderId: 2,
        productId: 1, 
        quantity: 1
      },
      {
        orderId: 3,
        productId: 2,
        quantity: 1
      },
      {
        orderId: 3, 
        productId: 1, 
        quantity: 1
      },
      {
        orderId: 3,
        productId: 5,
        quantity: 3
      },
      {
        orderId: 4,
        productId: 4,
        quantity: 2
      },
      {
        orderId: 5, 
        productId: 2, 
        quantity: 7
      },
      {
        orderId: 5,
        productId: 3,
        quantity: 6
      }
    ]

  const orderItems = await Promise.all(orderItemsToCreate.map(addOrderItemToOrder));
  console.log('order items created: ', orderItems)
  console.log('Finished creating order items!')
  } catch (error) {
    console.error('Error creating order items!')
    throw error;
  }
} 

async function createInitialCartItems() {
  console.log('Starting to create cart items...');
  try {
    const cartItemsToCreate = [
      {
        cartId: 1,
        productId: 2,
        quantity: 3
      },
      {
        cartId: 1,
        productId: 1,
        quantity: 1
      },
      {
        cartId: 1,
        productId: 5, 
        quantity: 2
      },
      {
        cartId: 2, 
        productId: 1,
        quantity: 2
      },
      {
        cartId: 3,
        productId: 5, 
        quantity: 1
      },
      {
        cartId: 3, 
        productId: 4,
        quantity: 2
      },
      {
        cartId: 3, 
        productId: 1,
        quantity: 1
      },
      {
        cartId: 4,
        productId: 5,
        quantity: 10
      },
      {
        cartId: 5, 
        productId: 2, 
        quantity: 1
      },
      {
        cartId: 5,
        productId: 3,
        quantity: 3
      },
      {
        cartId: 5,
        productId: 4,
        quantity: 1
      }
    ]

    const cartItems = await Promise.all(cartItemsToCreate.map(addCartItemToCart));
    console.log('cart items created: ', cartItems)
    console.log('Finished creating cart items!')
  } catch (error) {
    console.error('Error creating cart items!')
    throw error;
  }
}


async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await buildTables();
    await createInitialUsers();
    await createInitialProducts();
    //await createInitialCarts();
    await createInitialOrders();
    await createInitialOrderItems();
    //await createInitialCartItems();
    console.log('RebuildDB function was successful!')
  } catch(error) {
    console.log('Error during rebuildDB')
    throw error;
  } 
}

async function testDB() {
  try {
    console.log("Starting to test database...");

    console.log("Calling getAllUsers");
    const users = await getAllUsers();
    console.log("getAllUsers:", users);

    console.log("Calling getAllProducts");
    const products = await getAllProducts();
    console.log("results:", products);

    // console.log("Calling active Prodcuts");
    // const activeProductsResults = await getAllActiveProducts();
    // console.log("active products", activeProductsResults);

    // console.log("Calling getProductById");
    // const diamondEarrings = await getProductById(5);
    // console.log("product id results:", diamondEarrings);

    // console.log("calling getProductByCategory");
    // const bracelets = await getProductByCategory("bracelets");
    // const earrings = await getProductByCategory("earrings")
    // console.log("results for bracelets", bracelets)
    // console.log("results for earrings", earrings)

    // console.log("calling updateProduct");
    // const updateProductResult = await updateProduct(
    //   products[2].id, 
    //   {
    //     title: '"J Necklace', 
    //     description: 'Stylish stainless steel necklace with a "J" pendant', 
    //     inventory: 500
    //   }
    // );
    // console.log("the result of update", updateProductResult)

    // console.log("calling deactivateProduct")
    // const deactivateProductResult = await deactivateProduct(products[1].id);
    // console.log("deactivated result", deactivateProductResult);

    // console.log("calling deleteProduct")
    // const deleteProductResult = await deleteProduct(products[3].id)
    // console.log("deleted product", deleteProductResult);

    // const productsAfterDelete = await getAllProducts();
    // console.log("after delete", productsAfterDelete)

    console.log("Finished database tests!");
  } catch (error) {
    console.error("Error testing database!");
    throw error;
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());