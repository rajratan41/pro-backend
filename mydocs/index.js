const express = require("express");

const app = express();

// Swagger Docs
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
const fileUpload = require("express-fileupload");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(fileUpload());

let courses = [
  {
    id: "11",
    name: "Learn Reactjs",
    price: 299,
  },
  {
    id: "22",
    name: "Learn Angular",
    price: 299,
  },
  {
    id: "33",
    name: "Learn Django",
    price: 299,
  },
  {
    id: "44",
    name: "Learn JavaScript",
    price: 299,
  },
];

app.get("/", (req, res) => {
  res.send("Hello from Docs Backend");
});

app.get("/api/v1/course", (req, res) => {
  res.send("Hello from Courses Docs");
});

app.get("/api/v1/courseobject", (req, res) => {
  res.send({ id: "55", name: "Learn Backend", price: 999 });
});

app.get("/api/v1/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/v1/mycourse/:courseId", (req, res) => {
  const myCourse = courses.find((course) => course.id === req.params.courseId);

  res.send(myCourse);
});

app.post("/api/v1/addcourse", (req, res) => {
  console.log(req.body);
  courses.push(req.body);

  res.send(true);
});

app.get("/api/v1/coursequery", (req, res) => {
  let location = req.query.location;
  let device = req.query.device;

  res.send({ location, device });
});

app.post("/api/v1/courseupload", (req, res) => {
  console.log(req.headers);
  const file = req.files.file;
  let path = __dirname + "/images/" + Date.now() + ".jpg";

  file.mv(path, (err) => {
    res.send(true);
  });
});

app.listen(4000, () => {
  console.log(`Server is running at port 4000...`);
});
