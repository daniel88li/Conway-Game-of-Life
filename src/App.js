import React from "react";
import Canvas from "./Components/Canvas";
import Controls from "./Components/Controls";

function App() {
  return (
    <div className="App">
      <h1>Conway's Game of Life</h1>
      <Canvas />
      <Controls />
    </div>
  );
}

export default App;
