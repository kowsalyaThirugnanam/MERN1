import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client(
  {
    user: 'postgres',
    database: 'world',
    port: 5432,
    host: 'localhost',
    password: 'Nethravk12052016'
  }
)
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var countries = [];

app.get("/", async (req, res) => {
  //Write your code here.
 await visitedCountries(req,res)
});

app.post("/add", async (req, res) => {
  const input =  req.body["country"];
  try {
    var result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' ||  $1 || '%' ",
      [input.toLowerCase()]);
    console.log("res", result.rows);
    if(result.rows.length >0){
      await db.query(
        "INSERT INTO visited_country (country_code) VALUES ($1)",
        [result.rows[0].country_code]);
      res.redirect("/")
    }else {
      res.render("index.ejs",{error:"Country does not exist",countries: countries, total: countries.length})
    }

  } catch (error) {
    console.log("error in add req",error.message);
    if(error.message == 'duplicate key value violates unique constraint "visited_country_country_code_key"'){
      res.render("index.ejs",{error:'Country already added. Try again',countries: countries, total: countries.length})
    }
    
  }

})

async function visitedCountries(req,res) {
  countries=[];
  try {
    var result = await db.query("SELECT country_code FROM visited_country")
    
    result.rows.forEach(element => {
      countries.push(element.country_code)
    });
    res.render("index.ejs", { countries: countries, total: countries.length })
    // db.end();
  } catch (error) {
    console.log("error", error.message);
  }
}
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
