import React, { useState } from "react";

export default function ToDoItems(props) {
  const [textStyle, setTextStyle] = useState(false);
  function toDoCheck() {
    console.log("click");
    setTextStyle((preValue) => !preValue);
  }

  return (
    <div onClick={toDoCheck}>
      <li style={{ textDecoration: textStyle ? "line-through" : "none" }}>
        {props.item}
      </li>
    </div>
  );
}
