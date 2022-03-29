import React from "react";
import ReactDom from "react-dom";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";

import './index.css'
import App from "./App";
import reducers from "./reducers";

// use applyMiddleware to add the thunk middleware to the store
const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDom.render(
  <Provider store = {store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
