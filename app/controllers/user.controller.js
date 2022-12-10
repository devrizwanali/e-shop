const db = require("../models");
const config = require("../config/auth.config.js");
const User = db.user;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");

exports.findAll = (req, res) => {
  let currentUser = ''
  jwt.verify(req.headers["x-access-token"], config.secret, (err, decoded) => {
    currentUser = decoded;
  });

  var condition = { id: { [Op.ne]: currentUser.id } }
  User.findAll({ where: condition })
    .then(data => {
      users = data.map(user => {
        return { id: user.id, nickname: user.nickname, email: user.email, active: user.active, createdAt: user.createdAt,  updatedAt: user.updatedAt }
      })

      res.status(200).send(users)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: "User was updated successfully." });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

