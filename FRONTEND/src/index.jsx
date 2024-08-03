import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import About from "Routes/About";
import App from "App";
import Signup from "Routes/Signup";
import ErrorPage from "Routes/ErrorPage";
import CalcView from "./App_widget/Calculator/calcView";
import Login from "Routes/Login";
import { RecoilRoot } from "recoil";
import { Provider } from "react-redux";
import { AppStore } from "store/reduxStore/store.service";
import BlockView from "components/BlockView";
import Contact from "Routes/Contact";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <CalcView />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/signup",
        element: (
          <BlockView>
            <Signup />
          </BlockView>
        ),
      },
      {
        path: "/login",
        element: (
          <BlockView>
            <Login />
          </BlockView>
        ),
      },
      {
        path: "/contact",
        element: (
          <BlockView>
            <Contact />
          </BlockView>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={AppStore}>
      <RecoilRoot>
        <RouterProvider router={appRouter}></RouterProvider>
      </RecoilRoot>
    </Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
