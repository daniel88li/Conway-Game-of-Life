import React, { useRef, useEffect, useState, useCallback } from "react";
import Controls from "./Controls";

function Canvas(props) {
  const canvasRef = useRef(null);
  const gridRef = useRef(null);
  const intervalRef = useRef(null);
  const cellSize = 10;
  const deadCell = "white";
  const aliveCell = "black";
  const updateSpeed = "500";
  const [generation, setGeneration] = useState(0);
  const [population, setPopulation] = useState(0);
  const [lineFlag, setLineFlag] = useState(true);
  const [dimButtons, setDimButtons] = useState([false, false]);

  // build grid and init cell values (dead/alive)
  function buildGrid(cols, rows) {
    const gridArray = new Array(rows)
      .fill(null)
      .map(() =>
        new Array(cols).fill(null).map(() => Math.floor(Math.random() * 2))
      );
    return gridArray;
  }

  // update grid based on the rules
  function generationUpdate(grid, cols, rows) {
    const nextGen = grid.map((eachRow) => [...eachRow]);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        let neighbours = 0;

        // check adjacent cells
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) {
              continue;
            }
            const neighbourCol = col + i;
            const neighbourRow = row + j;
            if (
              neighbourCol >= 0 &&
              neighbourCol < cols &&
              neighbourRow >= 0 &&
              neighbourRow < rows
            ) {
              neighbours += grid[neighbourRow][neighbourCol];
            }
          }
        }

        // update for next generation
        const currCell = grid[row][col];
        if (currCell === 1 && (neighbours < 2 || neighbours > 3)) {
          nextGen[row][col] = 0;
        } else if (currCell === 0 && neighbours === 3) {
          nextGen[row][col] = 1;
        }
      }
    }
    return nextGen;
  }

  const draw = useCallback(
    (context, grid) => {
      for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
          const cell = grid[row][col];
          context.fillStyle = cell ? aliveCell : deadCell;
          context.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
          context.strokeStyle = lineFlag ? "grey" : "white";
          context.strokeRect(
            col * cellSize,
            row * cellSize,
            cellSize,
            cellSize
          );
        }
      }
    },
    [lineFlag]
  );

  // function clearCanvas(context) {
  //   context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  // }

  const update = useCallback(() => {
    let grid = gridRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const cols = Math.floor(canvas.width / cellSize);
    const rows = Math.floor(canvas.height / cellSize);
    grid = generationUpdate(grid, cols, rows);
    draw(context, grid);
    setGeneration((prev) => prev + 1);
    setPopulation(getPopulation(grid));
    gridRef.current = grid;
  }, [draw]);

  // run once on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    // console.log(canvas.width, canvas.height);
    const cols = Math.floor(canvas.width / cellSize);
    const rows = Math.floor(canvas.height / cellSize);
    // console.log(cols, rows);
    let grid = buildGrid(cols, rows);
    gridRef.current = grid;

    draw(context, grid);

    function update() {
      grid = generationUpdate(grid, cols, rows);
      draw(context, grid);
      setGeneration((prev) => prev + 1);
      setPopulation(getPopulation(grid));
      gridRef.current = grid;
    }

    const updateInterval = setInterval(() => {
      requestAnimationFrame(update);
    }, updateSpeed);
    intervalRef.current = updateInterval;

    return () => clearInterval(updateInterval);
  }, []);

  const onStart = useCallback(() => {
    onStop();
    const updateInterval = setInterval(() => {
      requestAnimationFrame(update);
    }, updateSpeed);
    intervalRef.current = updateInterval;
    setDimButtons([true, false]);
  }, [update]);

  function onStop() {
    clearInterval(intervalRef.current);
    setDimButtons([false, true]);
  }

  function toggleStroke() {
    setLineFlag((prev) => !prev);
  }

  useEffect(() => {
    onStart();
  }, [lineFlag, onStart]);

  function getPopulation(grid) {
    return grid
      .reduce((arr, row) => arr.concat(row))
      .reduce((sum, value) => sum + value);
  }

  // update cells on click
  function handleClick(e) {
    let grid = gridRef.current;
    const cellRow = Math.floor(e.nativeEvent.offsetY / cellSize);
    const cellCol = Math.floor(e.nativeEvent.offsetX / cellSize);
    grid[cellRow][cellCol] = grid[cellRow][cellCol] ? 0 : 1;
    gridRef.current = grid;
    // pause game to enable multiple edits
    onStop();
    const context = canvasRef.current.getContext("2d");
    draw(context, grid);
  }

  return (
    <div className="game">
      <canvas
        id="canvas"
        ref={canvasRef}
        {...props}
        onClick={(e) => handleClick(e)}
      />
      <div className="game-stat">
        <p>Generation: {generation}</p> <p>Population: {population}</p>
      </div>
      <p>Updates every {updateSpeed} ms.</p>
      <Controls
        onStart={onStart}
        onStop={onStop}
        toggleStroke={toggleStroke}
        dimStyle={dimButtons}
      />
    </div>
  );
}

export default Canvas;
