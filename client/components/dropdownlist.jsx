import React, { Component } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from "react-router-dom";
//import whaleTable from '../../server/data/whaleTable.json'
//const whaleTable = require('../../server/data/whaleTable.json');
import whaleTable from '../docs/whaleTable';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setWhaleActionCreator } from '../actions/actions';

const transactionDataBackend = 'http://localhost:3000/database/getTransactions/0x3b417faee9d2ff636701100891dc2755b5321cc3'
const nftComponentsBackend = `http://localhost:3000/database/getHoldings/`

export default function DropdownList(props) {

  const {curWhale, nftComponents, dataTransactions} = useSelector(state => state.nfts)
  // const [whale, setWhale] = React.useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch()



  const setWhale = async (walletAddress) => {
    const currentWhale = walletAddress
    const transactionData = await axios.get(transactionDataBackend).then(res => {
      console.log(`%c ${JSON.parse(res)}`, 'background-color: yellow');
      return res.json()
    })
    const nftComponentsData = await axios.get(nftComponentsBackend + walletAddress).then(res => res.json())
    const payload = {transactionData, nftComponentsData, currentWhale}
    dispatch(setWhaleActionCreator(payload))}



  // payload: {transactions: [], nftcomponents: [], wallet: 'qergqw4yi6j4uh3wg'}

  

  const handleChange = (event) => {
    const walletAddress = event.target.value;
    setWhale(walletAddress)
    //console.log('event ---->:', event);
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
            value={curWhale}
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