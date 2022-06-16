// import React, { Component } from 'react';
import React, {useEffect} from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import logo from '../docs/logo/WW_1.jpg';
import * as actions from "../actions/actions";

const url = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD&api_key={215c83221e15d164882ccf35f709ef2266294181012119fd54c5c30436cfc9ff}';


const Nav = () => {
  const price = useSelector(state => state.nfts.ethPrice)
  const dispatch = useDispatch()

  const getEthPrice = async () => {
        let price;
        const response = await axios.get(url)
        dispatch(actions.setEtherActionCreator(response.data.USD))}
  
  useEffect(() => getEthPrice(), [])

    return (
      <div id="navContainer">
        <div id='brandingWrapper'>
          <h1>W H A L E</h1>
          <a href='/'><img src={logo} id='whaleLogo' /></a>
        </div>

        <div className='ethNavWrapper'>
          <img
            src={'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png'}
            id='ethLogo'
          />
          <h3>ETH / USD: ${price}</h3>
        </div>
      </div>
    )
    } 
  
  

// export default connect(mapStateToProps, mapDispatchToProps)(Nav);
export default Nav