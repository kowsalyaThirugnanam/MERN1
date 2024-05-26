import React from "react";
import ReactDOM from "react-dom";
//Import the add, multiply, subtract and divide functions
//from the calculator.js file.
//If successful, your website should look the same as the Final.png
import { add, multiply, subtract, divide } from "./calculator";
//or
import * as Calc from "./calculator";

ReactDOM.render(
  <ul>
    <li>{add(1, 2)}</li>
    <li>{multiply(2, 3)}</li>
    <li>{subtract(7, 2)}</li>
    <li>{divide(5, 2)}</li>
    <br />
    <li>{Calc.add(1, 2)}</li>
    <li>{Calc.multiply(2, 3)}</li>
    <li>{Calc.subtract(7, 2)}</li>
    <li>{Calc.divide(5, 2)}</li>
  </ul>,
  document.getElementById("root")
);
