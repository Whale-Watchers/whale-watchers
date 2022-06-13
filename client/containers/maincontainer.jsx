// stateful component
import React, { Component } from 'react';
import { Button } from '@mui/material';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { parse } from 'ipaddr.js';

class MainContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      componentData: ['testing for holding data']
    }
    // this.getComponentData = this.getComponentData.bind(data);
  }

  // async getComponentData(endpoint, walletAddress) {
  //   const url = `http://localhost:3000/${endpoint}/${walletAddress}`;
  //   await axios.get(url).then(res => {
  //     this.setState({ componentData: res.data });
  //   })
  // }

  render() {
    const { navigate } = this.props;
    return (
      <div id='mainContainer'>

        <div id='appContainer'>
          <div id='toggleCompButtonsWrapper'>
            <Button
              id='graphButton'
              className='toggleButton'
              onClick={() => {
                return navigate('/graph', this.state.componentData);
              }}>Graph</Button>

            <Button
              id='holdingsButton'
              className='toggleButton'
              onClick={() => {
                // this.parseComponentData(holdingsData); // invoking with the json file data
                // this.getComponentData('/database/getHoldings', '')
                return navigate('/holdings', this.state.componentData);
              }}>Holdings</Button>

            <Button
              id='transactionsButton'
              className='toggleButton'
              onClick={() => {
                // this.parseComponentData(transactionData); // invoking with the json file data
                return navigate('/transactions', this.state.componentData);
              }}>Transactions</Button>
          </div>

        </div>
      </div>
    );
  }
}

export default MainContainer;