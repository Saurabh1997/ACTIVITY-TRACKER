import React from "react";
import "./App.css";
import Navbar from "App_widget/Nav_Component/Navbar";
import About from "Routes/About";
import { Outlet } from "react-router-dom";
import useActiveStatus from "utils/hooks/useActiveStatus";
import ErrorPage from "Routes/ErrorPage";
import AtomSimulator from "components/AtomSimulator";

function App() {
  const isOnline = useActiveStatus();
  console.log(" is online ", isOnline);
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
    <div>
      <Navbar options={options}></Navbar>
      <AtomSimulator />
      {!isOnline ? (
        "You are offline currently. Please check your internet connection"
      ) : (
        <Outlet />
      )}
    </div>
  );
}

export default App;
