import express from "express";
import bodyParser from "body-parser";
import pg from "pg"

const app = express();
const port = 3000;
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "online-store",
    password: "Nethravk12052016",
    port: 5432,
});
db.connect();

/**
 * Add body-parser as middle ware and declare public folder as static
 */
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))
/**
 * Start the express server
 */
app.listen(port, () => {
    console.log("Server started successfully !!!");
})

app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.get("/onlineStore", (req, res) => {
    res.render("onlineStore.ejs")
})

// app.get("/products/:name", (req, res) => {
//     console.log("req",req.params);
//     res.render("products.ejs")
// })

app.get("/products", (req, res) => {
    console.log("req",req.query);
    var data;
    if(req.query.name == 'add'){
        data ={
            select : 'add'
        }
        
    }else{
        data ={
            select : 'edit'
        }
    }
    res.render("products.ejs",data)
})