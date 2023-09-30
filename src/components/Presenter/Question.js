// React imports
import React, { useState } from "react";

// MAIN
export default function Question(props) {
  const { points } = props;

  function toggleQ() {
    props.handleClick();
  }
  return (
    <p className="question-button" onClick={() => toggleQ()}>
      {points}
    </p>
  );
}
