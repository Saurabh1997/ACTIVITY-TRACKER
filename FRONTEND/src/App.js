import React from "react";
import "./App.css";
import CalcView from "./App_widget/Calculator/calcView";

function App() {
  let options = ["Home", "About", "Contact us", "Careers"];

  let options_withmap = {
    Home: "#home",
  };
  return (
    <div className="App">
      {/* <NavComponent options={options}></NavComponent> */}
      <CalcView></CalcView>
    </div>
  );
}

export default App;
