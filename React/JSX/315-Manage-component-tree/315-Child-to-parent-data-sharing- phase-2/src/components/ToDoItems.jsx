import React, { useState } from "react";

export default function ToDoItems(props) {
  const [textStyle, setTextStyle] = useState(false);

  return (
    <div onClick={() => props.onChecked(props.id)}>
      <li>{props.item}</li>
    </div>
  );
}
