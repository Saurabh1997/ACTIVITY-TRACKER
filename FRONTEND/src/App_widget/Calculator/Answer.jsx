import React, { useState, useEffect } from "react";
import "./Calc.css";

export default function Answer({ answer }) {
  return <div className="ans-result">{answer}</div>;
}
