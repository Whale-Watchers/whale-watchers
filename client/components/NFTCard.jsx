import React from 'react';
// import { render } from 'sass';

export default function NFTCard(props) {
  const { address, tokenName, tokenSymbol, value, tokenDecimal, tokenImage } = props;

  return (
    <div className='nftWrapper'>
      <img src={`${tokenImage}`} className='NFT' />
      <p className='tokenDetailsSubHeading'>Token Name: <span className='tokenDetails'>{tokenName}</span></p>
      <p className='tokenDetailsSubHeading'>Token Symbol: <span className='tokenDetails'>{tokenSymbol}</span></p>
      <p className='tokenDetailsSubHeading'>Amount Owned: <span className='tokenDetails'>{value}</span></p>
    </div>
  )
}