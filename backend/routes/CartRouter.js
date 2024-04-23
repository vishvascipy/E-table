const express = require("express")
const CartController = require("../controllers/CartController")
const router = express.Router()

router.post("/addcart", CartController.addcart)

module.exports = router