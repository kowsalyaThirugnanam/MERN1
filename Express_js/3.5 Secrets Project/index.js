//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import {fileURLToPath} from "url";

const app = express();
const port =3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
var userIsAuthorised = false ;

//  ===============bodyParser Middleware ==============
app.use (bodyParser.urlencoded({extended:true}))

// =========Custom Middleware=================
function checkPassword(req,res,next) {
    console.log("checkPassword");
    if(req.body.password =='ILoveProgramming'){
        userIsAuthorised = true
    }else {
        userIsAuthorised =false
    }
    next()
}
app.use(checkPassword)

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/index.html")
})

app.post("/check",(req,res)=>{
    console.log(req.body.password);
    let filePath ;
    if(userIsAuthorised==true){
        filePath = "/public/secret.html"
    }else {

        filePath = "/public/index.html"
    }
    res.sendFile(`${__dirname}${filePath}`)
})
app.listen(port,()=>{
    console.log("Server started successfully !!!");
})