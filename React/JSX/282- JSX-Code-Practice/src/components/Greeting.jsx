import React from "react";

const date = new Date(2029,1,1,20);
console.log("date",date.getHours());
let greeting ="";
let greetingStyle ={
  color:"red"
}
if(date.getHours() > 0 && date.getHours() < 12){
  greeting = "Good Morning";
}else if(date.getHours() >= 12 && date.getHours() < 18){
  greeting = "Good Afternoon";
  greetingStyle.color = "green";
}else{
  greeting ="Good Evening";
  greetingStyle.color = "blue";
}
console.log("greeting",greeting);

function Greeting(params) {
   return <h1 className="header" style={greetingStyle}>{greeting}</h1>
}

export default Greeting;