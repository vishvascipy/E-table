const feedbackSchema = require('../models/feedback')    

module.exports = {
    addfeedback: async (req, res) => {
        const { Name, Email, Rating, RestaurantName, Message } = req.body
        try {
            const result = await feedbackSchema.create({
                Name, Email, Rating, RestaurantName, Message
            })
            res.status(200).json({ result })
        }
        catch (err) {
            res.status(400).json({ err })

        }
    },
    viewfeedback: async (req, res) => {
        let { RestaurantName } = req.query
        RestaurantName = decodeURIComponent(RestaurantName);
        const query = RestaurantName ? { RestaurantName } : {};
        try {
            const result1 = await feedbackSchema.find(query)
            res.status(200).json({ result1 })
        }
        catch (err) {
            res.status(400).json({ err })
        }
    }
}