const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = Schema({
  name: { type: String, default: null },
  img: { type: String },
  location: { type: String },
  operation: { type: Object, default: null },
  tables: { type: Object, default: {} }
});

module.exports = Company = mongoose.model("Company", restaurantSchema);