const mongoose = require('mongoose')
const Schema = mongoose.Schema
const feedbackSchema = new Schema({
    Name: {
        type: String
    },
    Email: {
        type: String,
    },
    Rating: {
        type: String
    },
    RestaurantName: {
        type: String
    },
    Message: {
        type: String
    }

})
module.exports = mongoose.model("feedback", feedbackSchema)