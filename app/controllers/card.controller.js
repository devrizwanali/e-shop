const db = require("../models");
const config = require("../config/auth.config.js");
const Card = db.card;
const Product = db.products;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");

exports.findAll = (req, res) => {
  let currentUser = user(req)
  Card.findAll({where: {userId: currentUser.id}, include: Product})
    .then(data => {
      res.status(200).send(data)
      
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};


function user(req) {
  let currentUser = ''
  jwt.verify(req.headers["x-access-token"], config.secret, (err, decoded) => {
    currentUser = decoded;
  });

  return currentUser
}

exports.create = async(req, res) => {

  const productId = req.body.productId;
  const userId = user(req).id;
  const quantity = req.body.quantity;


  const [card, created] = await Card.findOrCreate({
    where: { userId, productId },
    defaults: { quantity }
  });

  if(!created) {
    Card.update({
      quantity: +card.quantity + 1
    }, {where: { id: card.id }}).then(data => {
      res.send(card);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product."
      });
    });
  } else {
    res.status(200).send(card)
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Card.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Card was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Card with id=${id}. Maybe Card was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Card with id=" + id
      });
    });
};

