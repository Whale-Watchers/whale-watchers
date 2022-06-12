import React, { Component } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function DropdownList() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div id='dropdown'>
      <Box sx={{ minWidth: 300 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Choose a Whale</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Select a Whale"
            onChange={handleChange}
          >
            <MenuItem value={10}>Snoop Dogg</MenuItem>
            <MenuItem value={20}>Gary Vaynerchuk</MenuItem>
            <MenuItem value={30}>Jay Z</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}