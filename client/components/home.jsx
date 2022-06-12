import React, { Component } from "react";
import axios from "axios";
import HomeCard from "./homecards";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      whaleData: [{ name: 'JayZ', address: '0x00372812abcB11c2EA291aeb7F612D9e0524b013', netWorth: '$17M' }, { name: 'JayZ', address: '0x00372812abcB11c2EA291aeb7F612D9e0524b013', netWorth: '$17M' }, { name: 'JayZ', address: '0x00372812abcB11c2EA291aeb7F612D9e0524b013', netWorth: '$17M' }, { name: 'JayZ', address: '0x00372812abcB11c2EA291aeb7F612D9e0524b013', netWorth: '$17M' }, { name: 'JayZ', address: '0x00372812abcB11c2EA291aeb7F612D9e0524b013', netWorth: '$17M' }, { name: 'JayZ', address: '0x00372812abcB11c2EA291aeb7F612D9e0524b013', netWorth: '$17M' }, { name: 'JayZ', address: '0x00372812abcB11c2EA291aeb7F612D9e0524b013', netWorth: '$17M' }, { name: 'JayZ', address: '0x00372812abcB11c2EA291aeb7F612D9e0524b013', netWorth: '$17M' }, { name: 'JayZ', address: '0x00372812abcB11c2EA291aeb7F612D9e0524b013', netWorth: '$17M' }, { name: 'JayZ', address: '0x00372812abcB11c2EA291aeb7F612D9e0524b013', netWorth: '$17M' }],
      isLoading: false // change this to true to get loading component to work
    }
  }

  componentDidMount() {
    const url = 'http://localhost:3000/{<need end point here>}'

    // await axios.get(url).then(res => {
    //   this.setState({
    //     whaleData: res.data,
    //     isLoading: false
    //   })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // });
  }

  render() {
    const { whaleData, isLoading } = this.state;
    const cardsDisplay = [];

    if (isLoading === true) {
      return (
        <div id='isLoadingWrapper'>
          <Box sx={{ width: '60%' }}>
            <LinearProgress />
          </Box>
        </div>
      )
    }

    whaleData.forEach((whale, i) => {
      cardsDisplay.push(
        <HomeCard
          key={`Whale card ${i}`}
          name={whale.name}
          address={whale.address}
          netWorth={whale.netWorth}
        />
      );
    });

    return (
      <div id='homeContainer'>
        <div id='paginationWrapper'>
          <div id='cardWrapper'>
            {cardsDisplay}
          </div>
          {/* <Stack spacing={2}>
            <Pagination count={6} color="primary" />
          </Stack> */}
        </div>
      </div>
    )
  }
}

export default Home;