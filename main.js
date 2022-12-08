const express = require("express");
const cors = require("cors");

var corsOptions = {
 origin: "http://localhost:8080"
};

const app = express();
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route


const db = require("./app/models");
db.sequelize.sync({ force: true })
  .then(() => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log("Failed database connection: " + err.message);
  });

require("./app/routes/products")(app);


app.get("/", (req, res) => {
 res.json({ message: "Hello EFREI Student - Your Server lives!!!"});
});

// set port, listen for requests
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});