import React, { useState, useEffect } from "react";
import "./Calc.css";

export default function Answer({ answer }) {
  return <div className="absolute bottom-1 right-1 text-3xl">{answer}</div>;
}
