import React, { useState, useEffect } from "react";
import "./Calc.css";
import Answer from "./Answer";

export default function Result({ result, answer }) {
  return (
    <div className="text-right p-1 m-1 border border-solid relative text-4xl">
      {result}
      <Answer answer={answer}></Answer>
    </div>
  );
}
