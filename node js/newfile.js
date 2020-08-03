var express = require("express");

var app = express();

app.use(express.json()); //use to enable JASON

var cars = [
  {
    name: "Mehran",
    color: "Red",
    price: 100000,
  },
  {
    name: "Cultus",
    color: "White",

    price: 300000,
  },
  {
    name: "Corrola",
    color: "Black",
    price: 1500000,
  },
];
app.put("/updateprice/:name/:price", (req, res) => {
  var car = cars.find((c) => c.name === req.params.name);
  if (!car) res.status(404).send("The car with given name not Exist");

  car.price = req.params.price;
  res.send(cars);
});
app.delete("/delete/:name", (req, res) => {
  //console.log(req.params.name);
  var car = cars.find((c) => c.name === req.params.name);
  console.log(car);
  if (!car) res.status(404).send("The Car with given name not Exist");
  var carIndex = cars.indexOf(car);
  console.log(carIndex);
  cars.splice(carIndex, 1);
  res.send(car);

  //var name = req.params.name;
});
app.get("/carprice/:name", (req, res) => {
  //console.log(req.params.name);
  var car = cars.find((c) => c.name === req.params.name);
  if (!car) res.status(404).send("The Car with given Name not Exist");
  var carprice = car.price;
  res.send("price is = " + carprice);
});
app.post("/addcar/:name/:color/:price", (req, res) => {
  //console.log(req.params.name);
  var newcar = {
    name: req.params.name,
    color: req.params.color,
    price: req.params.price,
  };
  cars.push(newcar);
  res.send(cars);
});
app.get("/cars", (req, res) => {
  // console.log(req.params.name);

  res.send("Cars are :" + JSON.stringify(cars));
});

app.get("/car/price/:price", (req, res) => {
  var results = [];
  //console.log(req.params.name);
  var price = req.params.price;
  for (i = 0; i < cars.length; i++) {
    if (cars[i].price > parseInt(req.params.price)) {
      // console.log(cars[i].price);
      results.push(cars[i].price);
    }
  }
  res.send("prices  are :" + JSON.stringify(results));
  //res.send("price " + JSON.stringify(prices));
});

app.listen(8090, () => {
  console.log("listning at 8090");
  //console.log(Car.name);
});
