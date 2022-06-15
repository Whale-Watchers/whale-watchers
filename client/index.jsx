import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import store from "./store";
import styles from './scss/styles.scss';

// TODO: Make sure you can use PROVIDER with react-router

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)
