import React from "react";
import "./styles/index.scss";
import store from "./redux/store";
import App from "./components/App/App";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>
  
    <Provider store={store}>
  
      <App />
  
    </Provider>
  
  </React.StrictMode>

);
