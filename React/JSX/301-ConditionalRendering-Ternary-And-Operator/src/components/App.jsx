import React from "react";
import Login from "./Login";
var isLoggedIn = false;

var currentTime = new Date().getHours();
function RenderConditionally() {
  if (isLoggedIn) {
    return <h1>Hello</h1>;
  } else {
    return <Login />;
  }
}
function App() {
  return (
    <div className="container">
      {isLoggedIn ? <h1>Hello</h1> : <Login />}
      {currentTime > 12 && <h1> Why are you working still </h1>}
    </div>
  );
}

export default App;
