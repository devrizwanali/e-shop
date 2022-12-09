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
const Role = db.role;

db.sequelize.sync({force: true})
  .then(() => {
    createRoles()
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log("Failed database connection: " + err.message);
  });


function createRoles() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "admin"
  });
}

require("./app/routes/products")(app);
require('./app/routes/auth')(app);


app.get("/", (req, res) => {
 res.json({ message: "Server! I'm alive!!!"});
});

// set port, listen for requests
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});