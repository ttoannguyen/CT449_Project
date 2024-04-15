const express = require("express");
require("dotenv").config();
const router = express.Router();

const controller = require("../../controllers/client/product.controller");

router.get("/:id", controller.getProduct);
router.get("/", controller.getAll);
module.exports = router;
