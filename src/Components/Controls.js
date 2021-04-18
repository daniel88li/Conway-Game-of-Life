import React from "react";
import Button from "./Button";

function Controls(props) {
  return (
    <div className="controls">
      <Button
        id="button-start"
        btnStyle="btn--round"
        btnSize="btn--small"
        btnColour="blue"
        text="Start"
        btnClasses={props.dimStyle[0] ? "btn--dim" : ""}
        onClick={props.onStart}
      />

      <Button
        id="button-start"
        btnStyle="btn--round"
        btnSize="btn--small"
        btnColour="blue"
        text="Stop"
        btnClasses={props.dimStyle[1] ? "btn--dim" : ""}
        onClick={props.onStop}
      />

      <Button
        id="button-canvas-lines"
        btnStyle="btn--round"
        btnSize="btn--small"
        btnColour="blue"
        text="Toggle Lines"
        btnClasses=""
        onClick={props.toggleStroke}
      />
    </div>
  );
}

export default Controls;
