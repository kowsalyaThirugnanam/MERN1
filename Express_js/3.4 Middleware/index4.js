import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import morgan from "morgan";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
let brandName;
app.use(bodyParser.urlencoded({extends:true}))
// predefined morgan logging
// app.use(morgan("combined"))

// custom middleware logging
function logger(req,res,next) {
  console.log("Request method:",req.method);
  console.log("Request URL:",req.url);
  next() // this command used to tell custom middleware logging is completed and you can move to routing
}
app.use(logger)

function brandNameGenerator(req,res,next) {
  console.log("Request body",req.body);
  brandName = req.body.street+req.body.pet
  next()
}
app.use(brandNameGenerator)

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit",(req,res,next)=>{
  
  res.send(`<h3>Your band name is: <h3> <p>${brandName} ✌️<p>`)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
