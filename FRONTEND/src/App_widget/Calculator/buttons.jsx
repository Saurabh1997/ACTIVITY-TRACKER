import React, { useState, useEffect } from "react";
import "./Calc.css";

export default function buttons({ title, value, handleClick }) {
  // let handleClickinternal = (value) => {
  //   let val = value;
  //   console.log(" bbb " + val + " gabd " + han  dleClick);
  // };
  return (
    <button
      onClick={() => {
        handleClick(value);
      }}
      className="bg-inherit p-0 text-2xl font-bold"
    >
      {title}
    </button>
  );
}
