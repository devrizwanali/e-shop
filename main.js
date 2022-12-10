const express = require("express");
const cors = require("cors");

var corsOptions = {
 origin: "http://localhost:8080"
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const seed = require('./app/seed');

db.sequelize.sync()
  .then(() => {
    seed.createData()
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log("Failed database connection: " + err.message);
  });

require('./app/routes/auth')(app);
require("./app/routes/products")(app);
require('./app/routes/user')(app);
require('./app/routes/card')(app);


app.get("/", (req, res) => {
 res.json({ message: "Server! I'm alive!!!"});
});

// set port, listen for requests
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});