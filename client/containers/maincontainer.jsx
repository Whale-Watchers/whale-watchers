// stateful component
import React, { Component } from 'react';
import { Button } from '@mui/material';
import { Navigate } from 'react-router-dom';

class MainContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      graphData: ['hello I am state in the MainContainer component']
    }
  }

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
                // <Navigate to='/graph' state={this.state} />
                return navigate('/graph', this.state);
              }}>Graph</Button>

            <Button
              id='holdingsButton'
              className='toggleButton'
              onClick={() => {
                // <Navigate to='/holdings' state={this.state} />
                return navigate('/holdings', this.state);
              }}>Holdings</Button>

            <Button
              id='transactionsButton'
              className='toggleButton'
              onClick={() => {
                // <Navigate to='/transactions' state={this.state} />
                return navigate('/transactions', this.state);
              }}>Transactions</Button>
          </div>

        </div>
      </div>
    );
  }
}

export default MainContainer;