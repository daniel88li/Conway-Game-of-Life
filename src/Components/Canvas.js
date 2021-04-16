import React, { useRef, useEffect } from "react";

function Canvas(props) {
  const canvasRef = useRef(null);
  const cellSize = 5;
  const deadCell = "white";
  const aliveCell = "black";
  let currArray = [];

  function draw(context) {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  }

  function clearCanvas(context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    // console.log(canvas.width, canvas.height);
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const cols = canvas.width / cellSize;
    const rows = canvas.height / cellSize;
    // console.log(cols, rows);
    draw(context);
  }, []);

  return <canvas id="canvas" ref={canvasRef} {...props} />;
}

export default Canvas;
