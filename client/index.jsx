import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import store from "./store";
import styles from './scss/styles.scss';

// TODO: Make sure you can use PROVIDER with react-router

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)

/* render(
  // wrap the App in the Provider Component and pass in the store

  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("contents")
); */