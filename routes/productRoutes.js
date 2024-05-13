const express = require("express");
const { check } = require("express-validator");

const productControllers = require("../controllers/productControllers");
const middleware = require("../middleware");

const router = express.Router();

router.use(middleware);

router.get("/", productControllers.getAllProducts);

router.get("/:id", productControllers.getProductById);

router.post("/", productControllers.createProduct);

router.put("/:id", productControllers.updateProduct);

router.delete("/:id", productControllers.deleteProduct);

module.exports = router;
