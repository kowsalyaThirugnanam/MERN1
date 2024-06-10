import React, { useState } from "react";

function App() {
  const now = new Date().toLocaleTimeString();
  const [state, setTime] = React.useState(now);

  function getTime() {
    const newTime = new Date().toLocaleTimeString();
    setTime(newTime);
  }

  function getTimeAutomatic() {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
  }
  return (
    <div className="container">
      <h1>{state}</h1>
      <button onClick={getTime}>Get Time</button>
      <button onClick={getTimeAutomatic}>Auto Time</button>
    </div>
  );
}

export default App;
