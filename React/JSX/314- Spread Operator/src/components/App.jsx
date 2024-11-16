import React, { useState } from "react";

function App() {
  let [newInput, setNewInput] = useState("");
  const [inputItemList, setInputItemList] = useState([]);

  function handleInput(event) {
    const newValue = event.target.value;
    console.log("newValue", newValue);
    setNewInput(newValue);
  }

  function addItem() {
    console.log("newItem", newInput);
    setInputItemList((preValue) => {
      return [...preValue, newInput];
    });
    setNewInput("");
  }
  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input value={newInput} type="text" onChange={handleInput} />
        <button onClick={addItem}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          <li>A Item</li>
          {inputItemList.map((list, index) => (
            <li key={index}>{list} </li>
          ))}
          {/* <li> </li> */}
        </ul>
      </div>
    </div>
  );
}

export default App;
