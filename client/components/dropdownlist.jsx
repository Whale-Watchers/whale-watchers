import React, { Component } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from "react-router-dom";
//import whaleTable from '../../server/data/whaleTable.json'
//const whaleTable = require('../../server/data/whaleTable.json');

export default function DropdownList(props) {
  const whaleTable = [
    {
        "name": "Jay-Z",
        "wallet": "0x3b417faee9d2ff636701100891dc2755b5321cc3",
        "image": "~/client/docs/whales/jayz.png",
        "worth": "$124,189.88",
        "worth_num": 124189.88
    },
    {
        "name": "Mike Tyson",
        "wallet": "0x7217bc604476859303a27f111b187526231a300c",
        "image": "~/client/docs/whales/miketyson.png",
        "worth": "$16,102.69",
        "worth_num": 16102.69
    },
    {
        "name": "LaMello Ball",
        "wallet": "0xc1064e3662b0718357e9050694a3bfeaabede8ab",
        "image": "~/client/docs/whales/lamelloball.png",
        "worth": "$508,557.43",
        "worth_num": 508557.43
    },
    {
        "name": "Serena Williams",
        "wallet": "0x0864224f3cc570ab909ebf619f7583ef4a50b826",
        "image": "~/client/docs/whales/serenawilliams.png",
        "worth": "$138,999.06",
        "worth_num": 138999.06
    },
    {
        "name": "Elijah Wood",
        "wallet": "0xf6de94be96f80602d90bf29bd9e88a0e843b2eb9",
        "image": "~/client/docs/whales/elijahwood.png",
        "worth": "$138,030.13",
        "worth_num": 13830.13
    },
    {
        "name": "Jordan Belfort",
        "wallet": "0xdbf2445e5049c04cda797dae60ac885e7d79df9d",
        "image": "~/client/docs/whales/jordanbelfort.png",
        "worth": "$6,537.12",
        "worth_num": 6537.12
    },
    {
        "name": "DJ Marshmello",
        "wallet": "0xa0eaf6b0df87132c9a28e450a43c1d906defb60b",
        "image": "~/client/docs/whales/djmarshmello.png",
        "worth": "$958,792.87",
        "worth_num": 958792.87
    },
    {
        "name": "Lil Baby",
        "wallet": "0xc86b12d850fdbbf3260a7baae862f85857aadbba",
        "image": "~/client/docs/whales/lilbaby.png",
        "worth": "$295,117.93",
        "worth_num": 295117.93
    },
    {
        "name": "Jimmy Fallon",
        "wallet": "0x0394451c1238cec1e825229e692aa9e428c107d8",
        "image": "~/client/docs/whales/jimmyfallon.png",
        "worth": "$319,079.04",
        "worth_num": 319079.04
    },
    {
        "name": "Post Malone",
        "wallet": "0xbea020c3bd417f30de4d6bd05b0ed310ac586cc0",
        "image": "~/client/docs/whales/postmalone.png",
        "worth": "$631,170.62",
        "worth_num": 631170.62
    },
    {
        "name": "Kevin Hart",
        "wallet": "0xbbdac7ba85af15420afd1f4aa3313c3535b15cde",
        "image": "~/client/docs/whales/kevinhart.png",
        "worth": "$216,558.12",
        "worth_num": 216558.12
    },
    {
        "name": "Gwyneth Paltrow",
        "wallet": "0x31185f782a7c11044566d70dfcf1c8175486f451",
        "image": "~/client/docs/whales/gwynethpaltrow.png",
        "worth": "$224,307.46",
        "worth_num": 224307.46
    },
    {
        "name": "Madonna",
        "wallet": "0x58473e9ac681c4424ca74619281ff71801d002d6",
        "image": "~/client/docs/whales/madonna.png",
        "worth": "$1,763.77",
        "worth_num": 1763.77
    }
]

  const [whale, setWhale] = React.useState('');
  const navigate = useNavigate();
  //console.log(whaleTable);
  

  const handleChange = (event) => {
    const walletAddress = event.target.value;
    //console.log('event ---->:', event);
    setWhale(event.target.value);
    //console.log('whale ---->:', walletAddress);
    navigate(`/holdings/${walletAddress}`);
  };
const menuItems = whaleTable.map((element, index) => {
 return <MenuItem key={`Menu Item ${index}`} value={element.wallet}>{element.name}</MenuItem>
})
  return (
    <div id='dropdown'>
      <Box sx={{ minWidth: 300 }}>
        <FormControl id='form-control' fullWidth>
          <InputLabel id="demo-simple-select-label">Choose a Whale</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={whale}
            label="Select a Whale"
            onChange={handleChange}
          >
            {/* <MenuItem value={10}>Snoop Dogg</MenuItem>
            <MenuItem value={30}>Gary Vaynerchuk</MenuItem>
            max height overflow scroll
            <MenuItem value={20}>Jay Z</MenuItem> */}
            {menuItems}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}