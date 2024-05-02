const express = require("express")
const router = express.Router()
const RestaurantController = require("../controllers/RestaurantController")

router.post("/createrestaurant", RestaurantController.createRestaurant)
router.get("/viewrestaurant", RestaurantController.viewrestaurant)
router.delete("/deleterestaurant/:id", RestaurantController.deleterestaurant)

module.exports = router