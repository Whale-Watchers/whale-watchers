import React, { Component } from "react";
import HomeCard from "./homecards";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='homeContainer'>
        <HomeCard />
        <HomeCard />
        <HomeCard />
        <HomeCard />
        <HomeCard />
        <HomeCard />
        <HomeCard />
        <HomeCard />
        <HomeCard />
        <HomeCard />
        <HomeCard />
        <HomeCard />
      </div>
    )
  }
}

export default Home;