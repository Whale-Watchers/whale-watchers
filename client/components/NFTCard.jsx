import React from 'react';
// import { render } from 'sass';

export default function NFTCard (props) {
  const { address, tokenName, tokenSymbol, value, tokenDecimal, tokenImage } = props;

  return (
      <div>
        <p>{tokenName}</p>
      </div>
  )
}