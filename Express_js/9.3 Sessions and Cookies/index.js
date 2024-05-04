import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";

const app = express();
const port = 3000;
const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

/**
 * Session middleware
 */
app.use(session({
  secret:"TOPSECRETWORK",
  resave:false,
  saveUninitialized: true,
  cookie:{
    maxAge:1000*60*60*24 // 1000 = millisec * 60 = 1 min *60 = 1hrs *24 = 1 day
  }
}))
app.use(passport.initialize());
app.use(passport.session())

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "Nethravk12052016",
  port: 5432,
});
db.connect();

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
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      //hashing the password and saving it in the database
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          console.log("Hashed Password:", hash);
          const result =await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2)",
            [email, hash]
          );
          // res.render("secrets.ejs");
          const user = result.rows[0]
          req.login(user,(err)=>{
            console.log(err)
            res.redirect('/secret')
          })

        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", passport.authenticate("local",{
  successRedirect:"/secret",
  failureRedirect:"/login"
}));
 
app.get("/secret",(req,res)=>{
  console.log("req.user",req.user);
  if(req.isAuthenticated()){
    res.render("secrets.ejs")
  }else{
    res.redirect("/login")
  }
})

/**
 * Regisert the startegy. ref https://www.passportjs.org/tutorials/password/verify/
 */
passport.use(new Strategy ( async function verify(username,password,cb) {
  console.log("username,pass",username,password);
  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      username,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedHashedPassword = user.password;
      bcrypt.compare(password, storedHashedPassword, (err, result) => {
        if (err) {
          console.error("Error comparing passwords:", err);
        } else {
          if (result) {
            // res.render("secrets.ejs");
            return cb(null,user)
          } else {
            // res.send("Incorrect Password");
            return cb(null,false)
          }
        }
      });
    } else {
      // res.send("User not found");
      return cb("User not found")
    }
  } catch (err) {
    // console.log(err);
    return cb(err)
  }

} ))

/**
 * Store the logged user details in local storage
 */
passport.serializeUser((user,cb)=>{
  cb(null,user)
})

/**
 * Remove the logged user details in local storage
 */
passport.deserializeUser((user,cb)=>{
  cb(null,user)
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
