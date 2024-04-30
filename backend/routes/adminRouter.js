const express = require("express")
const router = express.Router()
const Admin = require("../controllers/adminController")
router.post("/signupadmin", Admin.adminsignup)
router.post("/signinadmin", Admin.adminsignin)

module.exports = router