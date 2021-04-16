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
        onClick={props.onStart}
      />

      <Button
        id="button-start"
        btnStyle="btn--round"
        btnSize="btn--small"
        btnColour="blue"
        text="Stop"
        onClick={props.onStop}
      />
    </div>
  );
}

export default Controls;
