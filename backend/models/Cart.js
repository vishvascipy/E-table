const mongoose = require("mongoose")
const Schema = mongoose.Schema
const CartSchema = new Schema({
    img: {
        type: String
    },
    Title: {
        type: String
    },
    Price: {
        type: String
    },
    Quantity: {
        type: String
    },
    Description: {
        type: String
    }
})
const MenuitemSchema = new Schema({
    RestaurantName: {
        type: String
    },
    userid: {
        type: String
    },
    TotalAmount: {
        type: String
    },
    cart: [CartSchema]
})
module.exports = mongoose.model("cart", MenuitemSchema)