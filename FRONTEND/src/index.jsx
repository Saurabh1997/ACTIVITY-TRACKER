import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import About from "Routes/About";
import App from "App";
import Signup from "Routes/Signup";
import ErrorPage from "Routes/ErrorPage";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    // children: [
    //   {
    //     path: "/about",
    //     element: <About />,
    //   },
    //   {
    //     path: "/signup",
    //     element: <Signup />,
    //   },
    // ],
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={AppRouter} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
