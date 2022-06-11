import React, { Component } from 'react';
import Holdings from '../components/holdings';
import Transactions from '../components transactions';

class WhaleContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      holdings: [],
      transactions: []
    }
  }
  render() {
    return (
      <div id='whalecontainer'>
        <Holdings />
        <Transactions />
      </div>
    )
  }
}

export default WhaleContainer;