import axios from 'axios';
import React, { Component, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import NFTCard from './NftCard';


const Holdings = () => {
    let walletAddress = useParams();
    let [loading, setLoading] = useState(true);
    let [nftComponents, setComponents] = useState([]);

    const whaleData = {
        eth: [],
        erc721: [],
        erc20: []
    }

    const nftCardComponents = [];

    const url = `http://localhost:3000/database/getHoldings/${walletAddress.id}`
    axios.get(url).then(res => {
        whaleData.eth = res.data.eth;
        whaleData.erc721 = res.data.erc721;
        whaleData.erc20 = res.data.erc20;
    }).then(() => {
        for (let address in whaleData.erc721) {
            const { tokenName, tokenSymbol, value, tokenDecimal, tokenImage } = whaleData.erc721[address];
            nftCardComponents.push(
                <NFTCard
                    key={address}
                    address={address}
                    tokenName={tokenName}
                    tokenSymbol={tokenSymbol}
                    value={value}
                    tokenDecimal={tokenDecimal}
                    tokenImage={tokenImage}
                />
            )
        }
        //------------------------------------------------------------------------------------------------------------
        // for (let address in whaleData.erc20) {
        //     const { tokenName, tokenSymbol, value, tokenDecimal, tokenImage } = whaleData.erc20[address];
        //     if (tokenName && tokenSymbol && value && tokenDecimal && tokenImage) {
        //     nftCardComponents.push(
        //         <NFTCard
        //             key={address}
        //             address={address}
        //             tokenName={tokenName}
        //             tokenSymbol={tokenSymbol}
        //             value={value}
        //             tokenDecimal={tokenDecimal}
        //             tokenImage={tokenImage}
        //         />
        //     )
        //   }
        // }
        // for (let address in whaleData.eth) {
        //     const { tokenName, tokenSymbol, value, tokenDecimal, tokenImage } = whaleData.eth[address];
        //     if (tokenName && tokenSymbol && value && tokenDecimal && tokenImage) {
        //     nftCardComponents.push(
        //         <NFTCard
        //             key={address}
        //             address={address}
        //             tokenName={tokenName}
        //             tokenSymbol={tokenSymbol}
        //             value={value}
        //             tokenDecimal={tokenDecimal}
        //             tokenImage={tokenImage}
        //         />
        //     )
        //     }
        // }
        //--------------------------------------------------------------------------------------------------------------------------

        setLoading(false);
        setComponents(nftCardComponents);
    }).catch(err => {
        console.log(err);
    });

    if (loading) {
        return (
            <div id='isLoadingWrapper'>
                <Box sx={{ width: '60%' }}>
                    <LinearProgress />
                </Box>
            </div>
        )
    }

    return (
        <div id="holdingsContainer">
            <h3>Holdings</h3>
            <div className="erc721">
                <div className='nftContainer'>
                    {nftComponents}
                </div>
            </div>
            <div className="erc70"></div>
            <div className="eth"></div>
        </div>
    )
}

export default Holdings;