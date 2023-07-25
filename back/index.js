const server = require('./src/app.js');
const { conn } = require("./src/database");
require('dotenv').config();


const PORT = process.env.PORT || 3002;

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log("Server on port", PORT);
  });
});
