import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [headingText, setHeadingText] = useState("");

  function handleInput(event) {
    setName(event.target.value);
  }
  function submitted(event) {
    setHeadingText(name);
    event.preventDefault();
  }

  return (
    <div className="container">
      <h1>Hello {headingText} </h1>
      <form onSubmit={submitted}>
        <input
          type="text"
          placeholder="What's your name?"
          onChange={handleInput}
          value={name}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
