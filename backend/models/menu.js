const mongoose = require('mongoose');
const Schema = mongoose.Schema
const menuSchema = new Schema({
    img: {
        type: String
    },
    Title: {
        type: String
    },
    Price: {
        type: String
    },
    Description: {
        type: String
    },
})
const restaurant = new Schema({
    Name: {
        type: String
    },
    menu: [menuSchema]
})

module.exports = mongoose.model("menu", restaurant)