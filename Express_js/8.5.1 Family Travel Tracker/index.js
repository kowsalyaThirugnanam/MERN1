import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "Nethravk12052016",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 3;

// let users1 = [
//   { id: 1, name: "Angela", color: "teal" },
//   { id: 2, name: "Jack", color: "powderblue" },
// ];
// console.log("type",typeof(users1));
let users;
async function userslist() {
  try {
    const result = await db.query("SELECT * FROM users")
    return result
  } catch (error) {
    console.log("error", error);
  }
}
async function checkVisisted() {
  try {
    console.log("currentUserId check",currentUserId);
    const result = await db.query("SELECT country_code FROM visited_country WHERE user_id = $1",[currentUserId]);
    console.log(`visited country list for userid ${currentUserId} -`,result.rows);
    let countries = [];
    result.rows.forEach((country) => {
      countries.push(country.country_code);
    });
    return countries;
  } catch (error) {
    
  }

}
app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  console.log("countries",countries);
  users = await userslist();
  console.log("users", users.rows);
  res.render("index.ejs", {
    countries: countries!= undefined? countries: [],
    total: countries!= undefined? countries.length : 0,
    users: users.rows,
    color: "teal",
  });
});
app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    console.log("data", data);
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_country (country_code,user_id) VALUES ($1,$2)",
        [countryCode,currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});
app.post("/user", async (req, res) => {
  console.log("user tab", req.body);
  if (req.body.add === 'new') {
    res.render("new.ejs")
  }else{
    currentUserId = req.body.user
    res.redirect('/');
  }


});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
  console.log("new user", req);
  try {
    const result = await db.query("INSERT INTO users (name,color) VALUES ($1,$2) RETURNING id", [req.body.name, req.body.color])
    console.log("new user added result", result);
    currentUserId = result.rows[0].id;
    console.log("currentUserId",currentUserId);
    res.redirect("/")
  } catch (error) {
    console.log("error", error);
  }

});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
