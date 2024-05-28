import React from "react";
import Entry from "./Entry";
import emojipedia from "./../emojipedia";

function CreateEmoji(emojiTerms) {
  return (
    <Entry
      key={emojiTerms.id}
      emoji={emojiTerms.emoji}
      name={emojiTerms.name}
      meaning={emojiTerms.meaning}
    />
  );
}
function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>

      <dl className="dictionary">{emojipedia.map(CreateEmoji)}</dl>
    </div>
  );
}

export default App;
