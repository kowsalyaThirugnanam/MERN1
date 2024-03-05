import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";


const app = express();
const port = 3000;


app.get("/", (req, res) => {
    const today = new Date();
    
    let date = today.getDay();
    console.log("date",date);
    let type = "a weekday"
    let adv =  "its time to work hard"
    if(date === 0 || date === 6){
        type="the weekend",
        adv ="its time to have some fun"
    }
    res.render("index.ejs", {
        dayType: type,
        advice: adv
    })
})
app.listen(port, () => {
    console.log("Server started successfully");
})