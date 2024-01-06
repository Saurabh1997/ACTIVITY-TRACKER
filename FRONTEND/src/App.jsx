import React from "react";
import "./App.css";
import CalcView from "./App_widget/Calculator/calcView";
import Navbar from "App_widget/Nav_Component/Navbar";
import About from "Routes/About";

function App() {
  let options = [
    {
      displayName: "Home",
      path: "/",
    },
    {
      displayName: "About",
      path: "/about",
    },
    {
      displayName: "Contact us",
      path: "/contact",
    },
    {
      displayName: "Careers",
      path: "/careers",
    },
    {
      displayName: "Login",
      path: "/login",
    },
    {
      displayName: "Sign up",
      path: "/signup",
    },
  ];

  let options_withmap = {
    Home: "#home",
  };
  return (
    <div className="App">
      <Navbar options={options}></Navbar>
      <CalcView></CalcView>
    </div>
  );
}

export default App;
