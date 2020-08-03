const mongoose = require("mongoose");
const productschema = mongoose.Schema({
  title: String,
  price: Number,
  tag: [String],
  slug: {
    type: String,
    lowercase: true,
  },
});
const productModel = mongoose.model("product", productschema);
module.exports = productModel;
