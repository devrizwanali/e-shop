const db = require("../models");
const Role = db.role;
const Product = db.products;

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
    category: 'Mens'
  });

  Product.create({
    name: 'Blue Jeans',
    price: 50,
    category: 'Mens'
  })
}



const data = {
  createProducts,
  createRoles
};

module.exports = data;
