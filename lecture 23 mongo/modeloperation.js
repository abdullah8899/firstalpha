const productModel = require("./product/productmodel");

const createproduct = async (title, price, tags) => {
  console.log("Create Product");
  let product = new productModel();
  product.title = title;
  product.price = price;
  product.tag = tags;

  await product.save();
  return product;
};
const updateproduct = async (_id, title, price, tags) => {
  console.log("Create Product");
  let product = await productModel.findById(_id);
  product.title = title;
  product.price = price;
  product.tag = tags;

  await product.save();
  return product;
};
const getproducts = async () => {
  let products = await productModel.find();
  return products;
};
const deleteproducts = async (_id) => {
  let product = await productModel.findByIdAndDelete(_id);
  return product;
};

module.exports.createproduct = createproduct;
module.exports.getproducts = getproducts;
module.exports.deleteproducts = deleteproducts;
module.exports.updateproduct = updateproduct;
