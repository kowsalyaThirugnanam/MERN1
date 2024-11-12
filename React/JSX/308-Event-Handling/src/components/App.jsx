import React, { useState } from "react";

function App() {
  const [headingText, setHeadingText] = useState("Hello");

  const [isMouseOver, setMouseOver] = useState(false);

  const [placeholder, setPlaceHolder] = useState("What's your name?");

  function handleClick() {
    setHeadingText("Submitted");
  }

  function mouseOver() {
    setMouseOver(true);
    setPlaceHolder("Hey !! tell me your name before move on");
  }

  function mouseOut() {
    setMouseOver(false);
    setPlaceHolder("What's your name?");
  }

  return (
    <div className="container">
      <h1>{headingText} </h1>
      <input type="text" placeholder={placeholder} />
      <button
        onClick={handleClick}
        style={{ background: isMouseOver ? "black" : "white" }}
        onMouseOver={mouseOver}
        onMouseOut={mouseOut}
      >
        Submit
      </button>
    </div>
  );
}

export default App;
