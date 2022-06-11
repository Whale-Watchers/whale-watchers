// stateful component
import React, { Component } from 'react';
import DropdownList from '../components/dropdownlist';
import Graph from '../components/graph';

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
        <Graph />
      </div>
    );
  }
}

export default MainContainer;