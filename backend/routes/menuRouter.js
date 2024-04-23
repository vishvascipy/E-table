const express = require("express")
const router = express.Router()

const MenuController = require("../controllers/menuController")
router.post("/postmenu", MenuController.postmenu)
router.get("/menu", MenuController.getMenu)
router.get("/menudetails", MenuController.menudetails)
router.get("/getmenuid/:id", MenuController.getmenuid)
module.exports = router