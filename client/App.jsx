import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Nav from './components/nav.jsx';
import MainContainer from './containers/maincontainer.jsx';
import WhaleContainer from './containers/whalecontainer.jsx';

const App = () => {
  return (
    <div id="app">
      <Nav />
      <MainContainer />
      <WhaleContainer />
      {/* <Routes>
        <Route path="/" element={<MainContainer />} />
        <Route path="/whale" element={<WhaleContainer />} />
      </Routes> */}
    </div>
  )
};

export default App;