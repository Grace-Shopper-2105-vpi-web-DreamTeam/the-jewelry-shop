// This is the Web Server
const express = require('express');
const server = express();

const dotenv = require ('dotenv');
const apiRouter = require('./api')


dotenv.config();



// create logs for everything
const morgan = require('morgan');
server.use(morgan('dev'));

// handle application/json requests
server.use(express.json());

// here's our static files
const path = require('path');
server.use(express.static(path.join(__dirname, 'build')));


// here's our API
server.use('/api', require("./api"));

server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body.message);
  console.log("<_____Body Logger END_____>");

  //next();
  res.status(400).send(req.body.message)
});

// by default serve up the react app if we don't recognize the route
server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

// bring in the DB connection
const { client } = require('./db');

// connect to the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  console.log(`Server is running on ${ PORT }!`);

  try {
    await client.connect();
    console.log('Database is open for business!');
  } catch (error) {
    console.error("Database is closed for repairs!\n", error);
  }
});