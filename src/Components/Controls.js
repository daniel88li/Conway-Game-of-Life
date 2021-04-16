import React from "react";
import Button from "./Button";

function Controls() {
  return (
    <div className="controls">
      <Button
        id="button-start"
        btnStyle="btn--round"
        btnSize="btn--small"
        btnColour="blue"
        text="Start"
      />

      <Button
        id="button-start"
        btnStyle="btn--round"
        btnSize="btn--small"
        btnColour="blue"
        text="Stop"
      />
    </div>
  );
}

export default Controls;
