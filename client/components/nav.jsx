import React, { Component } from 'react';
import axios from 'axios';

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ethPrice: 0
    }
  }

  async componentDidMount() {
    const url = '';
    // await axios.get(url).then(res => {
    //   this.setState({ethPrice: res.data });
    // });
  }

  render() {
    return(
    <div id="navContainer">
      <h1>W H A L E</h1>
      <div className='ethNavWrapper'>
        <img
        src={'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png'}
        id='ethLogo'
        />
        <h3>ETH Price: {this.state.ethPrice}</h3>
      </div>
    </div>
    )
  }
}

export default Nav;