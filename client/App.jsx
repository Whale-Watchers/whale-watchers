import React from 'react';
import { BrowserRouter as Router, useNavigate, Routes, Route } from "react-router-dom";
import Nav from './components/nav.jsx';
import MainContainer from './containers/maincontainer.jsx';
import DropdownList from './components/dropdownlist';
import Home from './components/home';
import Graph from './components/graph';
import Holdings from './components/holdings';
import Transactions from './components/transactions';
import { Button } from '@mui/material';

const App = () => {
  // Function for using useNavigate hook in class component MainContainer
  const navigate = useNavigate();
  function navigateToComp(route, state) {
    console.log(route, state);
    return navigate(route, state)
  }

  return (
    <div id="app">
      <Nav />
      <div id='dropdownWrapper'>
        <DropdownList />
      </div>
      <div id='appContainer'>
        <MainContainer navigate={navigateToComp} /> {/* prop drill down the function to be invoked */}
        <div id='componentWrapper'>
          <Routes>
            <Route exact path='/transactions' element={<Transactions />}></Route>
            <Route exact path='/holdings' element={<Holdings />}></Route>
            <Route exact path='/graph' element={<Graph />}></Route>
            <Route exact path='/' element={<Home />}></Route>
          </Routes>
        </div>
      </div>

    </div>
  )
};

export default App;