//libs
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
//styles
import "stylesheets/index.css";
//components
import App from "pages/App/App";
//redux
import { store } from "redux/store";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
