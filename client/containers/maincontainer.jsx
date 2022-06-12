// stateful component
import React, { Component } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import Home from '../components/home';
import DropdownList from '../components/dropdownlist';
import Graph from '../components/graph';
import Holdings from '../components/holdings';
import Transactions from '../components/transactions';

// class MainContainer extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       graphData: [] // just intitializing layout, change anything needed
//     }
//   }
function MainContainer() {
  let navigate = useNavigate();
  return (
    <div id='mainContainer'>
      <div id='dropdownWrapper'>
        <DropdownList />
      </div>

      <div id='mainWrapper'>

        <div id='toggleCompButtonsWrapper'>
          <Button
            id='graphButton'
            className='toggleButton'
            onClick={() => {
              navigate('/graph');
            }}>Graph</Button>

          <Button
            id='holdingsButton'
            className='toggleButton'
            onClick={() => {
              navigate('/holdings');
            }}>Holdings</Button>

          <Button
            id='transactionsButton'
            className='toggleButton'
            onClick={() => {
              navigate('/transactions');
            }}>Transactions</Button>
        </div>

        <div id='componentWrapper'> {/* should edit to be the home page full of whale cards eventually */}
          <Routes>
            <Route exact path='/transactions' element={<Transactions />}></Route>
            <Route exact path='/holdings' element={<Holdings />}></Route>
            <Route exact path='/graph' element={<Graph />}></Route>
            <Route exact path='/' element={<Home />}></Route>
          </Routes>
        </div>

      </div>

    </div>
  );
}

export default MainContainer;
