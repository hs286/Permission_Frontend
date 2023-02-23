import React from "react";
import ReactDOM from "react-dom/client";
import  { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Toaster 
      position="top-right"
      reverseOrder={false}/>
    </Provider>
  </React.StrictMode>
);


