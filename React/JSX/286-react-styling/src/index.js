//Create a React app from scratch.
//Show a single h1 that says "Good morning" if between midnight and 12PM.
//or "Good Afternoon" if between 12PM and 6PM.
//or "Good evening" if between 6PM and midnight.
//Apply the "heading" style in the styles.css
//Dynamically change the color of the h1 using inline css styles.
//Morning = red, Afternoon = green, Night = blue.
import React from "react";
import ReactDom from "react-dom";

let greetingMessage = "";
const customColor = {
  color: "purple",
};
const date = new Date(2019, 0, 1, 19);
const hours = date.getHours();
if (hours >= 0 && hours <= 12) {
  console.log("Its morning");
  customColor.color = "red";
  greetingMessage = "Good Morning";
} else if (hours >= 12 && hours <= 18) {
  console.log("Its Afternoon");
  customColor.color = "green";
  greetingMessage = "Good Afternoon";
} else if (hours >= 18 && hours <= 23) {
  console.log("Its evening");
  customColor.color = "blue";
  greetingMessage = "Good evening";
}
console.log("date", date.getHours());
ReactDom.render(
  <div>
    <h1 className="heading" style={customColor}>
      {greetingMessage}
    </h1>
  </div>,
  document.getElementById("root")
);
