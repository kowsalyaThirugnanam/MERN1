import express from "express";
import axios from "axios";

var app = express();
const port = 3000;

/**
 * Inilize the static folder
 */
app.use(express.static("public"))

app.get("/",async(req,res)=>{
    try {
    var result = await axios("https://api.adviceslip.com/advice")
    console.log("result",result.data.slip.advice);   
    res.render("index.ejs",{content:result.data})    

    } catch (error) {
        
    }
   
})
app.listen(port,()=>{
    console.log("Server started successfully !!!");
})