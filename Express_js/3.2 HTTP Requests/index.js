import { log } from "console";
import express from "express";

const app = express();

app.get("/",(req,res)=>{
    res.send("Home page.")
})

app.get("/contact",(req,res)=>{
    console.log(req.rawHeaders);
    res.send("<h1>Contact Page</h1>")
})

app.get("/about",(req,res)=>{
    res.send("<h1>About Page</h1>")
})

app.listen(3000,()=>{
    console.log("Server Started Successfully !!!");
})