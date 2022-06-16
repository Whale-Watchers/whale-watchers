import React, { Component } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';


const MediaCard = (props) => {
    const navigate = useNavigate()
    const { name, address, netWorth, image } = props;
    return (
      <Card sx={{ maxWidth: 370 }}>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" className='cardInfoHeading'>
            Address:
          </Typography>
          <Typography variant="body2" color="text.secondary" className='cardInfo'>
            {address}
          </Typography>
          <Typography variant="body2" color="text.secondary" className='cardInfoHeading'>
            Wallet Worth:
          </Typography>
          <Typography variant="body2" color="text.secondary" className='cardInfo'>
            {netWorth}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => navigate(`holdings/${address}`)} size="small" className='exploreButton'>Explore</Button>
        </CardActions>
      </Card >
    );
  }

export default MediaCard