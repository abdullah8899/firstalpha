var express = require("express");

var app = express();

app.use(express.json()); //use to enable JASON

var courses = [
  {
    id: 1,
    name: "course1",
  },
  {
    id: 2,
    name: "course2",
  },
  {
    id: 3,
    name: "course3",
  },
];

app.post("/api/courses", (req, res) => {
  var course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(course);
});
app.delete("/api/courses/:id", (req, res) => {
  var course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("The Course with given ID not Exist");

  var courseIndex = courses.indexOf(course);
  courses.splice(courseIndex, 1);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  var course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("The Course with given ID not Exist");

  if (req.body.name.length < 3) {
    res.status(400).send("Invalid Name");
  } else {
    course.name = req.body.name;
    res.send(course);
  }
});

app.listen(8070, () => {
  console.log("listning at 8070");
});
