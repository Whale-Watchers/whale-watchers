import React, { Component } from "react";

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ethPrice: 0
    }
  }

  render() {
    return(
    <div id="navContainer">
      <p>In nav</p>
      <p>ETH Price:</p>
    </div>
    )
  }
}

export default Nav;