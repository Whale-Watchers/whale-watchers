import React, { Component } from 'react';
import axios from 'axios';
import logo from '../docs/logo/WW_1.jpg';

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ethPrice: 0
    }
  }

  async componentDidMount() {
    const url = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD&api_key={215c83221e15d164882ccf35f709ef2266294181012119fd54c5c30436cfc9ff}';
    await axios.get(url).then(res => {
      this.setState({ ethPrice: res.data.USD });
    });
  }

  render() {
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
          <h3>ETH / USD: ${this.state.ethPrice}</h3>
        </div>
      </div>
    )
  }
}

export default Nav;