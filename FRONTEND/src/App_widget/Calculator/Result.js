import React, { useState, useEffect } from "react";
import "./Calc.css";
import Answer from "./Answer";

export default function Result({ result, answer }) {
  return (
    <div className="view-result">
      {result}
      <Answer answer={answer}></Answer>
    </div>
  );
}
