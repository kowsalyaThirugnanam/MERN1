import React, { useState } from "react";

function CreateArea(props) {
  const [cardInput, setCardInput] = useState({
    title: "",
    content: "",
  });

  function handleInput(events) {
    const { name, value } = events.target;
    console.log("wht", name, value);
    setCardInput((preValue) => {
      return { ...preValue, [name]: value };
    });
    console.log("cardInput", cardInput);
  }

  return (
    <div>
      <form
        onSubmit={(event) => {
          props.addItem(cardInput,event);
          setCardInput({
            title: "",
            content: "",
          });
        }}
      >
        <input
          name="title"
          placeholder="Title"
          onChange={handleInput}
          value={cardInput.title}
        />
        <textarea
          name="content"
          placeholder="Take a note..."
          rows="3"
          onChange={handleInput}
          value={cardInput.content}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
