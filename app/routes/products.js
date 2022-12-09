const { authJwt } = require("../middleware");

module.exports = app => {
  const products = require("../controllers/product.controller.js");
  var router = require("express").Router();

  router.post("/", [authJwt.verifyToken, authJwt.isAdmin], products.create);
  router.get("/", products.findAll);
  router.get("/:id", [authJwt.verifyToken, authJwt.isAdmin], products.findOne);
  router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], products.update);
  router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], products.delete);

  app.use('/api/products', router);
};
