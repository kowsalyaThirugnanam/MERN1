import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
const app = express();
const port = 3000;
const saltRound =10;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "Nethravk12052016",
  port: 5432,
})
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  console.log("username", req.body.username);
  console.log("password", req.body.password);
  const email = req.body.username;
  const password = req.body.password;
  
  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    console.log("reg res", checkResult.rows);
    if (checkResult.rows.length > 0) {
      res.send("Email id already exist. Try Login !!!")
    } else {

      bcrypt.hash(password,saltRound,async(err,hash)=>{
        if(err){
         console.log("Error during encrypt password",err);
        }else {
          const result = await db.query("INSERT INTO users(email,password) VALUES ($1,$2)", [email, hash]);
          console.log("reg res", result.rows);
          res.render("secrets.ejs")
        }
      })

      
    }

  } catch (error) {
    console.log("error", error);
  }

});

app.post("/login", async (req, res) => {
  console.log("username", req.body.username);
  console.log("password", req.body.password);
  try {
    const email = req.body.username;
    const password = req.body.password;
    const checkEmail = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    console.log("checkEmail", checkEmail.rows);
    if (checkEmail.rows.length > 0) {
      const storedPassword = checkEmail.rows[0].password
      bcrypt.compare(password,storedPassword,async(err,data)=>{
        if(err){
          console.log("Error during compare password",err);
        }else{
          if(data){
            console.log("password compare",data);
            console.log("Id Verified");
            res.render('secrets.ejs');
          }else{
            res.send('Incorrect Password')
          }
        }
      })
      
    } else {
      res.send("Email id not exist. Try register it !!!")
    }
  } catch (error) {
    console.log(error);
  }

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
