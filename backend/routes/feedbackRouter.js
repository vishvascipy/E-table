const express = require('express')
const router = express.Router()
const feedbackController = require('../controllers/feedbackController')

router.post('/addfeedback', feedbackController.addfeedback)
router.get('/viewfeedback', feedbackController.viewfeedback)

module.exports = router