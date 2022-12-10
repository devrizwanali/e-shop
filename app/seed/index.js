const db = require("../models");
const Role = db.role;
const Product = db.products;
const User = db.user;
var bcrypt = require("bcryptjs");

const createRoles = () => {
  Role.findOrCreate({ where: {
    id: 1,
    name: "user"
  }});
 
  Role.findOrCreate({ where: {
    id: 2,
    name: "admin"
  }});
}

const createProducts = () => {
  Product.findOrCreate({ where: {
      name: 'T-shirts',
      price: 30,
      category: 'Mens',
      rating: 4.5
    }});

  Product.findOrCreate({ where: {
    name: 'Blue Jeans',
    price: 50,
    category: 'Mens',
    rating: 5
  }})
}

const createAdmin = () => {
  const [user, created] = User.findOrCreate({ where: {
    email: 'john.doe@gmail.com',
  }, defaults: {password: bcrypt.hashSync('john@doe', 8), nickname: 'John Doe' }})

  if(!created) {
    user.setRoles([2]).then(userRole => {
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          console.log(`${roles[i].name} created ${user.nickname}`);
        }
      });
    })
  }
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
