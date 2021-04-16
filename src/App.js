import React from "react";
import Canvas from "./Components/Canvas";

function App() {
  return (
    <div className="App">
      <h1>Conway's Game of Life</h1>
      <h3>
        Read the rules on{" "}
        <a href={"https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"}>
          wikipedia
        </a>
      </h3>
      <Canvas />
    </div>
  );
}

export default App;
