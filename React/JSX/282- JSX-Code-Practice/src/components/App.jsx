import React from "react";
import Headers from "./Headers";
import Greeting from "./Greeting";

const numb = "7";

function App() {
    return (<div>
        <Headers />
        <Greeting />
        <p>your lucky number {numb}</p>
    </div>)
}

export default App;