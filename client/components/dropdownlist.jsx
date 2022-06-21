import React, { Component } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { useNavigate } from "react-router-dom";
//import whaleTable from '../../server/data/whaleTable.json'
//const whaleTable = require('../../server/data/whaleTable.json');
import whaleTable from '../docs/whaleTable';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setWhaleActionCreator } from '../actions/actions';

const transactionDataBackend = 'http://localhost:3000/database/getTransactions/'
const nftComponentsBackend = `http://localhost:3000/database/getHoldings/`


export default function DropdownList(props) {

  const curWhale = useSelector(state => state.nfts.whale)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const setWhale = async (walletAddress) => {
    const currentWhale = walletAddress
    const transactionData = await fetch(transactionDataBackend + walletAddress).then(res => res.json())
  ;
    const nftComponentsData = await fetch(nftComponentsBackend + walletAddress).then(res => res.json())
    const payload = {transactionData, nftComponentsData, currentWhale}
  
    dispatch(setWhaleActionCreator(payload))}

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
      <Box>
            <Autocomplete 
            options={whaleTable.map(obj => {return {label: obj.name, id: obj.wallet}})}
            disablePortal
            id="combo-box-demo"
            sx={{ width: 300 }}
            renderInput={(params) => {
              console.log(params)
              return <TextField {...params} value={'hello'} label="Whale" />}
            }
            // {menuItems}

            />
            
      </Box>
    </div>
  );
}

