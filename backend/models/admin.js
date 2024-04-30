const mongoose = require("mongoose")
const Schema = mongoose.Schema
const adminSchema = new Schema({
    UserName: {
        type: String
    },
    Email: {
        type: String
    },
    Password: {
        type: String
    }
})
module.exports = mongoose.model("admin", adminSchema)