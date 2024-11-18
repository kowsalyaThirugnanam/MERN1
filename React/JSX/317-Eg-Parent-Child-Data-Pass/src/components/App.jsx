import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [noteList, setNoteList] = useState([]);

  function addItem(item, event) {
    console.log("item", item);
    setNoteList((preValue) => {
      return [...preValue, item];
    });
    event.preventDefault();
    console.log("list", noteList);
  }

  function deleteItem(id) {
    console.log("delete id clicked", id);
    setNoteList((preValue) => {
      return preValue.filter((item, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea addItem={addItem} />
      {noteList.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            deleteItem={deleteItem}
          />
        );
      })}
      {/* <Note key={1} title="Note title" content="Note content" /> */}
      <Footer />
    </div>
  );
}

export default App;
