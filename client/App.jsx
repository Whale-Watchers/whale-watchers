import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Nav from './components/nav.jsx';
import MainContainer from './containers/maincontainer.jsx';

const App = () => {
  return (
    <Router>
      <div id="app">
        <Nav />
        <MainContainer />
      </div>
    </Router>
  )
};

export default App;