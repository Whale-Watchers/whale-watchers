// stateful component
import React, { Component } from 'react';
import { Button } from '@mui/material';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { parse } from 'ipaddr.js';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function MainContainer () {

  // async getComponentData(endpoint, walletAddress) {
  //   const url = `http://localhost:3000/${endpoint}/${walletAddress}`;
  //   await axios.get(url).then(res => {
  //     this.setState({ componentData: res.data });
  //   })
  // }

  const navigate = useNavigate()
  const whale = useSelector(state => state.nfts.whale)

    return (
      <div id='mainContainer'>

        <div id='appContainer'>
          <div id='toggleCompButtonsWrapper'>
            {/* <Button
              id='graphButton'
              className='toggleButton'
              onClick={() => {
                return navigate('/graph', this.state.componentData);
              }}>Graph</Button> */}

            <Button
              id='holdingsButton'
              className='toggleButton'
              onClick={() => navigate(`/holdings/${whale}`)}>Holdings</Button>

            <Button
              id='transactionsButton'
              className='toggleButton'
              onClick={() => navigate('/transactions')
              }>Transactions</Button>
          </div>

        </div>
      </div>
    );
  }


export default MainContainer;