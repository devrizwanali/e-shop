const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.register = (req, res) => {
  User.create({
    nickname: req.body.nickname,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ user: user, message: "User was registered successfully!" });
          });
        });
      } else {
        user.setRoles([1]).then(() => {
          var token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 });
          var authorities = [];
          user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
              authorities.push(roles[i].name.toLowerCase());
            }
            res.status(200).send({
              id: user.id,
              nickname: user.nickname,
              email: user.email,
              roles: authorities,
              accessToken: token,
              active: user.active
            });
          });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.login = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Email Or Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push(roles[i].name.toLowerCase());
        }
        res.status(200).send({
          id: user.id,
          nickname: user.nickname,
          email: user.email,
          roles: authorities,
          accessToken: token,
          active: user.active
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
