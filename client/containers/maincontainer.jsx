// stateful component
import React, { Component } from 'react';
import DropdownList from '../components/dropdownlist';
import Graph from '../components/graph';
import Holdings from '../components/holdings';
import Transactions from '../components/transactions';

class MainContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      graphData: [] // just intitializing layout, change anything needed
    }
  }

  render() {
    return ( 
      <div id='mainContainer'>
        <DropdownList />
        {this.state.loginStatus === true ? <Graph /> : (this.state.loginStatus === false ? <WhaleContainer /> : <Dashboard />)}
        <Holdings />
        <Transactions />
      </div>
    );
  }
}

export default MainContainer;