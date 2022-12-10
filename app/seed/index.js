const db = require("../models");
const Role = db.role;
const Product = db.products;
const User = db.user;
var bcrypt = require("bcryptjs");

const createRoles = () => {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "admin"
  });
}

const createProducts = () => {
  Product.create({
    name: 'T-shirts',
    price: 30,
    category: 'Mens',
    rating: 4.5
  });

  Product.create({
    name: 'Blue Jeans',
    price: 50,
    category: 'Mens',
    rating: 5
  })
}

const createAdmin = () => {
  User.create({
    nickname: 'John Doe',
    email: 'john.doe@gmail.com',
    password: bcrypt.hashSync('john@doe', 8)
  }).then(user => {
    user.setRoles([2]).then(userRole => {
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          console.log(`${roles[i].name} created ${user.nickname}`);
        }
      });
    })
  })
}

const createData = () => {
  createProducts();
  createRoles();
  createAdmin();
}

const data = {
  createData
};

module.exports = data;
