import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  let nameLength = 1;
  res.render("index.ejs")
});

app.post("/submit", (req, res) => {
  console.log(req.body);
  let nameLength =req.body["fName"].length + req.body["lName"].length
  console.log("length",nameLength);
  res.render("index.ejs",{numberofLetters:nameLength})
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
