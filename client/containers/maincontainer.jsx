// stateful component
import React, { Component } from 'react';

class MainContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      graphData: [] // just intitializing layout, change anything needed
    }
  }
}

export default MainContainer;