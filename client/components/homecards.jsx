import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SnoopDogg from '../docs/whales/SnoopDogg.png';

// const bull = (
//   <Box
//     component="span"
//     sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
//   >
//     •
//   </Box>
// );

export default function HomeCard() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom id="alias">
        Cozomo de’ Medici
        </Typography>
        <Typography variant="h5" component="div" id="whale_name">
          Snoop Dogg
        </Typography>
        <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom id="wallet">
        0xCe90a7949bb78892F159F428D0dC23a8E3584d75
        </Typography>
        <img src={SnoopDogg} width="150" id="nft_profilepic"/>
        <Typography sx={{ mb: 1.5}} color="text.secondary" id="networth">
        $17 million
        </Typography>
        <Typography variant="body2">

          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}