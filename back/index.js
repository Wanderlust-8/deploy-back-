const express = require("express");
const server = express();
const routes = require("./src/routes/index.routes");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const { conn } = require("./src/database");
require('dotenv').config();
require('./src/database.js');

server.name = 'API';

//midleweares
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan('dev'));

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

//Routes
server.use("/", routes);

const PORT = process.env.PORT || 3002;

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log("Server on port", PORT);
  });
});
