const { authJwt } = require("../middleware");
const controller = require("../controllers/card.controller.js");

module.exports = app => {
  var router = require("express").Router();

  router.get("/", [authJwt.verifyToken], controller.findAll);
  router.post("/", [authJwt.verifyToken], controller.create);
  router.delete("/:id", [authJwt.verifyToken], controller.delete);

  app.use('/api/cards', router);
};
