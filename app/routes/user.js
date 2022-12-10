const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller.js");

module.exports = app => {
  var router = require("express").Router();

  router.get("/", [authJwt.verifyToken, authJwt.isAdmin], controller.findAll);
  router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.update);

  app.use('/api/users', router);
};
