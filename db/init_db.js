// code to build and initialize DB goes here
const { bindComplete } = require('pg-protocol/dist/messages');

const {
  client
} = require('./index');
const {
  createUser,
  getAllUsers
} = require('./users');

const {
  getAllOrders,
  createOrder,
  getOrdersByUserId,
  getOrderById
} = require('./orders');

const {
  addOrderItemToOrder,
  getOrderItemsByOrder
} = require('./orderItems');

const {
  createCart,
  checkoutCart,
  getCartByCartId,
  getCartByUserId
} = require('./cart');

const {
  addItemToCart,
  getCartItemById,
  deleteCartItem,
  getAllCartItems,
  updateCartItemQuantity,
  attachProductInfoToCartItem
} = require('./cart_item')

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
        image VARCHAR(255),
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
    //total DECIMAL(19, 4),
    //quantity INTEGER
    await client.query(`
      CREATE TABLE cart(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        "isActive" BOOLEAN DEFAULT true
      );
      CREATE TABLE cart_item(
        id SERIAL PRIMARY KEY,
        "cartId" INTEGER REFERENCES cart(id),
        "productId" INTEGER REFERENCES products(id),
        quantity INTEGER,
        UNIQUE ("cartId", "productId")
      );
      CREATE TABLE order_item(
        id SERIAL PRIMARY KEY,
        "orderId" INTEGER REFERENCES orders(id),
        "productId" INTEGER REFERENCES products(id),
        quantity INTEGER,
        UNIQUE ("orderId", "productId")
      );
    `);

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
      { emailAddress: "greg123@gmail.com", username: 'greg', password: 'greg123' },
      { emailAddress: "albert123@gmail.com", username: 'albert', password: 'bertie99' },
      { emailAddress: "glamgal123@gmail.com", username: 'glamgal', password: 'glamgal123' },
      { emailAddress: "griffb@gmail.com", username: 'griff', password: 'worstleagueplayer7' },
      { emailAddress: "jacksons@gmail.com", username: 'jackson', password: 'edm4evur' },
      { emailAddress: "admin123@gmail.com", username: 'admin1', password: 'admin123', isAdmin: true },
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
      { title: 'Rolex Submariner', description: 'black dial arabic numerals classic design', category: 'watches', price: '8252.97', inventory: 3, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/frontPage/rolex3.png" },
      { title: 'Medical ID Bracelet', description: 'Steel bracelet with name and medical information', category: 'bracelets', price: '50.99', inventory: 5000, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/frontPage/medical3.png" },
      { title: '"B" Necklace', description: 'Stylish stainless steel necklace with a "B" pendant', category: 'necklaces', price: '129.99', inventory: 352, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/BNecklace+(500+x+500+px).png" },
      { title: 'Beaded Bracelet Set', description: 'Set of 3 different beaded bracelets', category: 'bracelets', price: '29.99', inventory: 26, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/frontPage/beaded2.png" },
      { title: 'Diamond Earrings', description: 'Beautiful, simple set of diamond earrings', category: 'earrings', price: '999.99', inventory: 43, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/frontPage/diamondEarring2.png" },
      { title: 'Diamond Drop Earrings', description: 'Delicate drop diamond earrings, limited edition', category: 'earrings', price: '1999.99', inventory: 23, isActive: false, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/frontPage/dropEarrings.png" },
      { title: 'Blue Fringe Earrings', description: 'Cute, Gold-Plated', category: 'earrings', price: '29.99', inventory: 56, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Earrings/newearrings1.png" },
      { title: 'Black & White Earrings', description: 'Made with Diamond Rhinestones', category: 'earrings', price: '39.99', inventory: 42, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Earrings/newearrings2.png" },
      { title: 'Moon Earrings', description: 'Good For All Occasions, Gold-Plated', category: 'earrings', price: '19.99', inventory: 90, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Earrings/newearrings3.png" },
      { title: 'Gold Flower Earrings', description: 'Beautiful Lotus Flower Design made with 14K Gold', category: 'earrings', price: '17.99', inventory: 16, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Earrings/newearrings4.png" },
      { title: 'Gold Hoop Earrings', description: 'Medium Size, Beaded Design', category: 'earrings', price: '39.99', inventory: 34, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Earrings/newearrings5.png" },
      { title: 'Purple Diamond Earrings', description: 'Stunning Purple Earrings for Fancy Occasions', category: 'earrings', price: '25.99', inventory: 59, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Earrings/newearrings6.png" },
      { title: 'Small Gold Hoop Earrings', description: 'Gold-Plated, Cute Bead Design', category: 'earrings', price: '19.99', inventory: 24, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Earrings/newearrings7.png" },
      { title: 'Gold Turquoise Earrings', description: 'Earrings with a Turquoise Orb in the Center', category: 'earrings', price: '15.99', inventory: 28, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Earrings/newearrings8.png" },
      { title: 'Fan Earrings', description: 'Gold-Plated', category: 'earrings', price: '19.99', inventory: 70, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Earrings/newearrings9.png" },
      { title: 'Blue Flower Earrings', description: 'Flower Design with Blue Thread', category: 'earrings', price: '12.99', inventory: 47, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Earrings/newearrings10.png" },
      { title: 'Gold Dangle Earrings', description: 'Gold-Plated, Overlapping Circles', category: 'earrings', price: '39.99', inventory: 98, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Earrings/newearrings11.png" },
      { title: 'Navy Blue Orb Earrings', description: 'Circular Blue made with Sterling Silver', category: 'earrings', price: '18.99', inventory: 36, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Earrings/newearrings12.png" },
      { title: 'Lotus Flower Dangle Earrings', description: 'Gold-Plated', category: 'earrings', price: '29.99', inventory: 44, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Earrings/newearrings13.png" },
      { title: 'Silver Triangle Earrings', description: 'Retro Silver Triangles', category: 'earrings', price: '16.99', inventory: 39, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Earrings/newearrings14.png" },
      { title: 'Silver Star Dangle', description: 'Sterling Silver, Cute Design', category: 'earrings', price: '29.99', inventory: 74, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Earrings/newearrings15.png" },
      { title: 'Black Heart Dangle Earrings', description: 'Gold-Plated, Black Glass Stone ', category: 'earrings', price: '39.99', inventory: 64, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Earrings/newearrings16.png" },
      { title: 'Golden Snake Earrings', description: 'Golden Snakes that Swirl into a Circle', category: 'earrings', price: '20.99', inventory: 10, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Earrings/newearrings17.png" },
      { title: 'Dragonfly with a Pearl Earrings', description: 'Cute Dragonfly with a Dangling Pearl', category: 'earrings', price: '17.99', inventory: 14, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Earrings/newearrings18.png" },
      { title: 'Purple Flower Earrings', description: 'Purple Earrings with an Elegant Flower Design', category: 'earrings', price: '11.99', inventory: 42, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Earrings/newearrings19.png" },
      { title: 'Sterling Silver Circle Earrings', description: 'Circular Silver Earrings with a Purple Bead', category: 'earrings', price: '49.99', inventory: 11, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Earrings/newearrings20.png" },
      { title: 'Gold Spring Bracelets', description: 'Gold with Pink and Green Stones', category: 'bracelets', price: '28.99', inventory: 59, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/bracelets/bracelet1.png" },
      { title: 'Heart Charm Bracelet', description: 'Cute, Rose Gold', category: 'bracelets', price: '23.99', inventory: 27, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/bracelets/bracelet2.png" },
      { title: 'Elegant Gold Bracelets', description: 'Two Cute Golden Bracelets', category: 'bracelets', price: '35.99', inventory: 38, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/bracelets/bracelet3.png" },
      { title: 'Flower Charm Bracelet', description: 'Thin, Gold with Flower Charm', category: 'bracelets', price: '17.99', inventory: 23, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/bracelets/bracelet4.png" },
      { title: 'Jewel Bracelet', description: 'Thick with Various Green and Brown Jewels', category: 'bracelets', price: '21.99', inventory: 49, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/bracelets/bracelet5.png" },
      { title: 'Thin Silver Bracelet', description: 'Cute, made with Sterling Silver', category: 'bracelets', price: '15.99', inventory: 41, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/bracelets/bracelet6.png" },
      { title: 'Turquoise Rhinestone Bracelet', description: 'Blue Rhinestones with Silver', category: 'bracelets', price: '23.99', inventory: 24, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/bracelets/bracelet7.png" },
      { title: 'Simple Gold Bracelet', description: 'Cute, Silver Rhinestones', category: 'bracelets', price: '16.99', inventory: 46, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/bracelets/bracelet8.png" },
      { title: 'Thick Flower Bracelet', description: 'Black and Gold Bracelet with a Flower Design', category: 'bracelets', price: '25.99', inventory: 63, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/bracelets/bracelet9.png" },
      { title: 'Chain Bracelet', description: 'Sterling Silver Chains', category: 'bracelets', price: '27.99', inventory: 15, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/bracelets/bracelet10.png" },
      { title: 'Turquoise Stone Bracelet', description: 'Yellow and Turquoise Stones', category: 'bracelets', price: '29.99', inventory: 37, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/bracelets/bracelet11.png" },
      { title: 'Rose Gold Bracelet', description: 'Simple, Thin Rose Gold Band', category: 'bracelets', price: '17.99', inventory: 64, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/bracelets/bracelet12.png" },
      { title: 'Snap Together Bracelet', description: 'Two Orbs Snap Together, Rose Gold', category: 'bracelets', price: '19.99', inventory: 45, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/bracelets/bracelet13.png" },
      { title: 'Blue Bracelet', description: 'Light Blue, Easy to Put on', category: 'bracelets', price: '23.99', inventory: 25, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/bracelets/bracelet14.png" },
      { title: 'Simple Silver Bracelet', description: 'Cute, Sterling Silver', category: 'bracelets', price: '14.99', inventory: 55, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/bracelets/bracelet15.png" },
      { title: 'Pearl Flower Bracelet', description: 'Pearl Bracelet with Large Flower', category: 'bracelets', price: '21.99', inventory: 65, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/bracelets/bracelet16.png" },
      { title: 'Rope Stone Bracelet', description: 'Rope Thread with Colorful Stones', category: 'bracelets', price: '22.99', inventory: 34, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/bracelets/bracelet17.png" },
      { title: 'Red Flower Bracelet', description: 'Red with Flower Design', category: 'bracelets', price: '18.99', inventory: 58, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/bracelets/bracelet18.png" },
      { title: 'Thick Green Charm Bracelet', description: 'Multiple Gold Bracelets with Jewels', category: 'bracelets', price: '29.99', inventory: 60, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/bracelets/bracelet19.png" },
      { title: 'Rose Gold Flower Bracelet', description: 'Cute Flower Design', category: 'bracelets', price: '17.99', inventory: 54, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/bracelets/bracelet20.png" },
      { title: 'Dark Red Golden Watch', description: 'Gold Watch with Dark Red Center', category: 'watches', price: '178.99', inventory: 38, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Watches/watch1.png" },
      { title: 'Comfortable Black Watch', description: 'Simple Black watch made with Leather', category: 'watches', price: '169.99', inventory: 25, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Watches/watch2.png" },
      { title: 'Old School Watch', description: 'Comfortable with Old Timey Vibes', category: 'watches', price: '177.99', inventory: 66, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Watches/watch3.png" },
      { title: 'Silver Bracelet Watch', description: 'Fashionable with Bracelet-like Design', category: 'watches', price: '199.99', inventory: 29, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Watches/watch4.png" },
      { title: 'Simple Brown Watch', description: 'Tells the Time', category: 'watches', price: '59.99', inventory: 27, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Watches/watch5.png" },
      { title: 'Slick Black Watch', description: 'Makes you look Cool and Serious', category: 'watches', price: '188.99', inventory: 53, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Watches/watch6.png" },
      { title: 'Simple Black Watch', description: 'Also tells time but has no numbers', category: 'watches', price: '158.99', inventory: 44, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Watches/watch7.png" },
      { title: 'Roman Numerals Watch', description: 'Makes you look classy and smart', category: 'watches', price: '197.99', inventory: 78, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Watches/watch8.png" },
      { title: 'Simple Black Watch 2', description: 'Also tells time and has no numbers!', category: 'watches', price: '160.99', inventory: 99, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Watches/watch9.png" },
      { title: 'Gold Pocket Watch', description: 'Looks like a Compass, but it’s not!', category: 'watches', price: '250.99', inventory: 76, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Watches/watch10.png" },
      { title: 'Black Watch with Holes', description: 'Holes for Extra Flavor', category: 'watches', price: '180.99', inventory: 78, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Watches/watch11.png" },
      { title: 'Golden Watch', description: 'Looks like Thread but it’s Metal!', category: 'watches', price: '178.99', inventory: 22, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Watches/watch12.png" },
      { title: 'Slick Silver Watch', description: 'Cool Silver Watch!', category: 'watches', price: '198.99', inventory: 18, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Watches/watch13.png" },
      { title: 'Black and Red Watch', description: 'Black with Splashes of Red', category: 'watches', price: '168.99', inventory: 77, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Watches/watch14.png" },
      { title: 'Simple Silver Watch', description: 'Tells time and is Silver', category: 'watches', price: '137.99', inventory: 58, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Watches/watch15.png" },
      { title: 'Smaller Pocket Watch', description: 'Another Gold Pocket Watch but Smaller', category: 'watches', price: '126.99', inventory: 75, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Watches/watch16.png" },
      { title: 'Square Watch!', description: 'Square!', category: 'watches', price: '279.99', inventory: 8, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Watches/watch17.png" },
      { title: 'Silver Rose Gold Watch', description: 'Silver and Rose Gold Intertwined', category: 'watches', price: '203.99', inventory: 16, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Watches/watch18.png" },
      { title: 'Silver and Black Watch', description: 'Silver with Black Face, no numbers', category: 'watches', price: '177.99', inventory: 58, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Watches/watch19.png" },
      { title: 'Simple Black and Silver Watch', description: 'It’s a watch!', category: 'watches', price: '158.99', inventory: 22, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Watches/watch20.png" },
      { title: 'Wedding Ring Set', description: 'Yellow Gold, Diamond', category: 'rings', price: '1580.99', inventory: 67, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Rings/ring1.png" },
      { title: 'Round Cut Diamond Ring', description: '1CT, Silver', category: 'rings', price: '1250.00', inventory: 48, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Rings/ring2.png" },
      { title: 'Mens Wedding Ring', description: 'Silver & Gold', category: 'rings', price: '250.00', inventory: 58, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Rings/ring3.png" },
      { title: 'Gold Fashion Ring', description: 'Yellow Gold Plated', category: 'rings', price: '50.00', inventory: 80, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Rings/ring4.png" },
      { title: '5 Carat Ruby Ring', description: 'Oval Cut, Diamond Accents', category: 'rings', price: '596.00', inventory: 80, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Rings/ring5.png" },
      { title: 'Fashion Circle Ring', description: 'Silver Metal, Cubic Zirconia', category: 'rings', price: '30.00', inventory: 34, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Rings/ring7.png" },
      { title: 'Accordion Gold Ring', description: 'Fashion, Gold Metal', category: 'rings', price: '26.00', inventory: 46, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Rings/ring6.png" },
      { title: 'Fashion Jewel Ring', description: 'Gold Metal, Cubic Zirconia', category: 'rings', price: '50.00', inventory: 96, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Rings/ring8.png" },
      { title: 'Diamond Solitaire Ring ', description: '.75CT, Silver', category: 'rings', price: '987.70', inventory: 32, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Rings/ring9.png" },
      { title: 'Twin Heart Ring', description: 'Fashion, Silver Metal', category: 'rings', price: '56.00', inventory: 33, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Rings/ring10.png" },
      { title: 'Tiger Eye Ring', description: 'Fashion, Silver Metal', category: 'rings', price: '43.99', inventory: 99, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Rings/ring11.png" },
      { title: 'Vintage Aquamarine Ring', description: '14K Gold', category: 'rings', price: '249.90', inventory: 22, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Rings/ring12.png" },
      { title: 'Ruby Solitaire Ring', description: '.5CT, 14K', category: 'rings', price: '359.99', inventory: 48, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Rings/ring13.png" },
      { title: 'Gold Fashion Ring', description: 'Gold Metal', category: 'rings', price: '29.99', inventory: 78, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Rings/ring14.png" },
      { title: 'Tourmaline Ring', description: '10k White Gold', category: 'rings', price: '299.99', inventory: 87, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Rings/ring15.png" },
      { title: 'Gold Knot Ring', description: 'Gold Plated', category: 'rings', price: '79.99', inventory: 48, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Rings/ring16.png" },
      { title: 'Silver Bead Ring', description: 'Sterling Silver', category: 'rings', price: '35.99', inventory: 74, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Rings/ring17.png" },
      { title: 'Silver Wire Ring', description: 'Sterling Silver', category: 'rings', price: '29.76', inventory: 23, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Rings/ring18.png" },
      { title: 'Jade Square Ring', description: 'Silver, Diamond Accents', category: 'rings', price: '159.99', inventory: 98, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Rings/ring19.png" },
      { title: 'Emerald and Diamond Ring', description: 'White Gold, Diamond Accent', category: 'rings', price: '199.99', inventory: 48, isActive: true, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Rings/ring20.png" },
      {title: 'Gold Jewel Necklace', description: 'Detailed Necklace with Multicolored Jewels', category: 'necklaces', price: '19.99', inventory: 52, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Necklaces/necklace1.png"},
 {title: 'Blue Daisy Necklace', description: 'Cute Blue Flowers with Gold Chain', category: 'necklaces', price: '14.99', inventory: 32, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Necklaces/necklace2.png"},
 {title: 'Beaded Necklace', description: 'Colorful Beads with Charm', category: 'necklaces', price: '17.99', inventory: 35, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Necklaces/necklace3.png"},
 {title: 'Black and Purple Necklace', description: 'Black and Purple Beads on Silver Chain', category: 'necklaces', price: '24.99', inventory: 24, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Necklaces/necklace4.png"},
 {title: 'Beach Necklace', description: 'Blue Beads with Beach Charms', category: 'necklaces', price: '21.99', inventory: 36, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Necklaces/necklace5.png"},
 {title: 'Blue Beaded Necklace', description: 'Light and Dark Blue Beads with Cute Silver Charms', category: 'necklaces', price: '18.99', inventory: 70, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Necklaces/necklace6.png"},
 {title: 'Gold Necklace', description: 'Gold Chain with Jewel in Center', category: 'necklaces', price: '20.99', inventory: 66, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Necklaces/necklace7.png"},
 {title: 'Jewel Necklace', description: '3 Chain Necklace with Multicolored Jewels', category: 'necklaces', price: '25.99', inventory: 26, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Necklaces/necklace8.png"},
 {title: 'Black and White Necklace', description: 'Black and White Necklace with Intertwining Jewel', category: 'necklaces', price: '27.99', inventory: 43, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Necklaces/necklace9.png"},
 {title: 'Heart Necklace', description: 'Cute Gold Chain with Heart Charm', category: 'necklaces', price: '9.99', inventory: 45, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Necklaces/necklace10.png"},
 {title: 'Purple Jewel Necklace', description: 'Silver Chain with Purple Jewel Center', category: 'necklaces', price: '29.99', inventory: 35, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Necklaces/necklace11.png"},
 {title: 'Purple Lady Necklace', description: 'Purple Jewel with Gold Lady Design', category: 'necklaces', price: '26.99', inventory: 42, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Necklaces/necklace12.png"},
 {title: 'Silver Heart Necklace', description: 'Silver Chain, Cute Heart Charm', category: 'necklaces', price: '23.99', inventory: 47, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Necklaces/necklace13.png"},
 {title: 'Gold Flower Necklace', description: 'Gold with Cute Flower Charm', category: 'necklaces', price: '19.99', inventory: 22, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Necklaces/necklace14.png"},
 {title: 'Multicolored Bead Necklaces', description: 'Two Multi-Colored Necklaces', category: 'necklaces', price: '39.99', inventory: 42, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Necklaces/necklace15.png"},
 {title: 'Pearl Necklace', description: 'Fashionable Pearl Necklace', category: 'necklaces', price: '30.99', inventory: 21, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Necklaces/necklace16.png"},
 {title: 'Flower Pearl Necklace', description: 'Gold Chain with Large Flower Pearl Center', category: 'necklaces', price: '32.99', inventory: 46, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Necklaces/necklace17.png"},
 {title: 'Gold and Silver Necklace', description: 'Three Chain Necklace with Large Bead', category: 'necklaces', price: '39.99', inventory: 33, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Necklaces/necklace18.png"},
 {title: 'Black Jewel Necklace', description: 'Silver Chain with Black Jewel Center', category: 'necklaces', price: '29.99', inventory: 56, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Necklaces/necklace19.png"},
 {title: 'Fancy Necklace', description: 'Elegant Gold and Silver', category: 'necklaces', price: '43.99', inventory: 58, image: "https://thejewelryshop.s3.us-east-2.amazonaws.com/Necklaces/necklace20.png"}
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
      { userId: 1, isActive: true },
      { userId: 2, isActive: true },
      { userId: 3, isActive: true },
      { userId: 4 },
      { userId: 5, isActive: false },
      { userId: 5, isActive: true },
      { userId: 6, isActive: true },
      { isActive: true }
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
      { userId: 1, total: 110.97 },
      { userId: 2, total: 8252.97 },
      { userId: 1, total: 11303.93 },
      { userId: 3, total: 59.98 },
      { userId: 5, total: 59.98 },
      { userId: 4, total: 389.97 }
    ]

    const orders = await Promise.all(ordersToCreate.map(createOrder));
    console.log('order items created: ', orders)
    console.log('Finished creating orders!')
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
      },
      {
        orderId: 6,
        productId: 3,
        quantity: 4
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
      },
      {
        cartId: 7,
        productId: 4,
        quantity: 3
      },
      {
        cartId: 7,
        productId: 6,
        quantity: 1
      }
    ]

    const cartItems = await Promise.all(cartItemsToCreate.map(addItemToCart));
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
    await createInitialCarts();
    await createInitialOrders();
    await createInitialOrderItems();
    await createInitialCartItems();
    console.log('RebuildDB function was successful!')
  } catch (error) {
    console.log('Error during rebuildDB')
    throw error;
  }
}

async function testDB() {
  try {
    console.log("Starting to test database...");

    // console.log("calling getAllOrders");
    // const allOrders = await getAllOrders();
    // console.log("the orders are", allOrders);

    // console.log("calling getOrdersByUserID");
    // const userOrder = await getOrdersByUserId(1);
    // console.log("user 1's orders are", userOrder)

    // console.log("calling createOrder");
    // const newOrder = await createOrder({userId: 3});
    // console.log("the new order is", newOrder);

    // console.log("calling get orderItemsByOrder");
    // const orderItems = await getOrderItemsByOrder(2);
    // console.log("the order items are", orderItems);

    // console.log("Calling getAllUsers");
    // const users = await getAllUsers();
    // console.log("getAllUsers:", users);

    // console.log("Calling getAllProducts");
    // const products = await getAllProducts();
    // console.log("results:", products);

    // console.log("calling getCartById")
    // const cart = await getCartByCartId(1);
    // console.log("cart is ", cart)

    // console.log("calling checkoutCart");
    // const checkedOutCart = await checkoutCart(3);
    // console.log("checkedOutCart", checkedOutCart);


    // // console.log("calling updateProduct");
    // // const updateProductResult = await updateProduct(
    // //   products[4].id, 
    // //   {
    // //     image: "../imgs/earrings3_resized.png"
    // //   }
    // // );
    // // console.log("the result of update", updateProductResult)

    // console.log("calling getOrderById");
    // const orderIdResult = await getOrderById(7);
    // console.log("the order is", orderIdResult);

    // console.log("calling getAllCartItems")
    // const getAllCartItemsToReturn = await getAllCartItems();
    // console.log("all cart items are", getAllCartItemsToReturn);

    // console.log("calling getCartItems")
    // const cartItem = await getCartItemById(1);
    // console.log("the cart item is", cartItem);

    // console.log("calling getCart by userId")
    // const userCart = await getCartByUserId(1);
    // console.log("usercart it", userCart);

    // console.log("calling delete cart item");
    // const deletedCartItemToReturn = await deleteCartItem(1);
    // console.log("the deleted cart item is", deletedCartItemToReturn);

    // console.log("calling update cart item");
    // //takes two params - 1st: new quantity, 2nd: item id
    // const updatedCartItemToReturn = await updateCartItemQuantity(5, 1);
    // console.log("the updated cart item is", updatedCartItemToReturn);

    // console.log("calling getCart by userId")
    // const userCartAfterDelete = await getCartByUserId(1);
    // console.log("usercart it", userCartAfterDelete);

    // console.log("Calling getProductById");
    // const diamondEarrings = await getProductById(2);
    // console.log("product id results:", diamondEarrings);

    // console.log("attach product to cart info")
    // const cartItemsWithProductInfo = await attachProductInfoToCartItem(1);
    // console.log("the product info is", cartItemsWithProductInfo)

    // console.log("Calling active Prodcuts");
    // const activeProductsResults = await getAllActiveProducts();
    // console.log("active products", activeProductsResults);

    // console.log("Calling getProductById");
    // const thisProduct = await getProductById(5);
    // console.log("product id results:", thisProduct);

    // console.log("calling getProductByCategory");
    // const bracelets = await getProductByCategory("bracelets");
    // const earrings = await getProductByCategory("earrings")
    // console.log("results for bracelets", bracelets)
    // console.log("results for earrings", earrings)

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