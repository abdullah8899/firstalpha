const express = require("express");

const app = express();

app.use(express.json()); //use to enable JASON
const mongoose = require("mongoose");
const {
  createproduct,
  getproducts,
  deleteproducts,
  updateproduct,
} = require("./modeloperation");

mongoose
  .connect("mongodb://localhost/mernstack", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("successfully connected");
    let product = await updateproduct(
      "5f25c95ddaca421f88685a33",
      "lumabddaini",
      566777,
      ["big", "classy"]
    );
    console.log(product);
    // let products = await getproducts();
    //console.log(products);
    // let dproducts = await deleteproducts("5f25c3aeeeb3b72c205d0f15");
    //console.log(dproducts);
  })
  .catch((err) => {
    console.log("error conecting");
    console.log(err);
  });

app.listen(8090, () => {
  console.log("listning at 8090");
  //console.log(Car.name);
});
