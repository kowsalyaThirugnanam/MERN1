import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./../public/styles.css";

ReactDOM.render(<App />, document.getElementById("root"));

const citrus = ["lime", "lemon", "orange"];
const fruit = ["coconut", "apple", "banana"];

const allFruits = [...fruit, ...citrus];
console.log(allFruits);
console.log("==>", [citrus, ...fruit]);

const name = {
  fName: "Kowsalya",
  lName: "Thirugnanam",
};
const contact = {
  name,
  email: "abc@xyz.com",
};
console.log(contact);
