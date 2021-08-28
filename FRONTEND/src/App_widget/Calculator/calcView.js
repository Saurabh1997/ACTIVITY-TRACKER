import React, { useState, useEffect } from "react";
import Buttons from "./buttons";
import "./Calc.css";
import Result from "./Result";

export default function CalcView() {
  const [question, setQuestion] = React.useState("0");
  const [answer, getAnswer] = React.useState(0);
  let ans;
  const handleClick = (value) => {
    switch (value) {
      case "=":
        if (question != "0") {
          try {
            getAnswer(eval(question));
            console.log(eval(question));
          } catch (error) {
            console.log("error " + error);
            getAnswer("SYNTAX ERROR");
          }
        }
        break;
      case "DEL":
        setQuestion("0");
        break;
      case "CE":
        setQuestion(question.slice(0, -1));
        break;
      default:
        if (question != "0") {
          setQuestion(question + value);
        } else {
          setQuestion(value);
        }
    }
    // setQuestion(question + value);
  };

  const button_vals = [
    "CE",
    "DEL",
    "%",
    "+",
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "*",
    "0",
    ".",
    "=",
  ];
  const button_array = button_vals.map((value) => {
    return (
      <Buttons
        title={value}
        question={question}
        key={value}
        value={value}
        handleClick={handleClick}
      ></Buttons>
    );
  });
  return (
    <div className="Calc">
      <Result result={question} answer={answer}></Result>
      <div className="Buttons">
        {button_array}

        {/* <Buttons title={"%"}  question={question}></Buttons>
        <Buttons title={"+"}  question={question}></Buttons>
        <Buttons title={"7"}  question={question}></Buttons>
        <Buttons title={"8"} question={question}></Buttons>
        <Buttons title={"9"} question={question}></Buttons>
        <Buttons title={"/"} question={question}></Buttons>
        <Buttons title={"4"} question={question}></Buttons>
        <Buttons title={"5"} question={question}></Buttons>
        <Buttons title={"6"} question={question}></Buttons>
        <Buttons title={"-"} question={question}></Buttons>
        <Buttons title={"1"} question={question}></Buttons>
        <Buttons title={"2"}></Buttons>
        <Buttons title={"3"}></Buttons>
        <Buttons title={"*"}></Buttons>
        <Buttons title={"0"}></Buttons>
        <Buttons title={"."}></Buttons>
        <Buttons title={"="}></Buttons>  */}
      </div>
    </div>
  );
}
