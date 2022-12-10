const { authJwt } = require("../middleware");
const controller = require("../controllers/product.controller.js");

module.exports = app => {
  var router = require("express").Router();

  router.post("/", [authJwt.verifyToken, authJwt.isAdmin], controller.create);
  router.get("/", controller.findAll);
  router.get("/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.findOne);
  router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.update);
  router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.delete);

  app.use('/api/products', router);
};
