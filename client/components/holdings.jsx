import axios from 'axios';
import React, { Component, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import NFTCard from './NFTCard';
import { useSelector, useDispatch } from 'react-redux';
import { crossTraceCalc } from 'plotly.js/lib/bar';
import { setWhaleActionCreator } from '../actions/actions';
import MainContainer from '../containers/maincontainer';

const transactionDataBackend = 'http://localhost:3000/database/getTransactions/'
const nftComponentsBackend = `http://localhost:3000/database/getHoldings/`


const Holdings = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const whale = useSelector(state => state.nfts.whale);
    if (params.id !== whale) {
        const setWhale = async (walletAddress) => {
            const currentWhale = walletAddress
            const transactionData = await fetch(transactionDataBackend + walletAddress).then(res => res.json())
            // console.log(`%c ${transactionData[0].hash}`, 'background-color: red');
            const nftComponentsData = await fetch(nftComponentsBackend + walletAddress).then(res => res.json())
            // console.log(`%c ${nftComponentsData.eth.value}`, 'background-color: magenta');
            const payload = {transactionData, nftComponentsData, currentWhale}
          
            dispatch(setWhaleActionCreator(payload))}
        setWhale(params.id)
    }
    
    const nftComponentsERC721 = useSelector(state => state.nfts.nftComponents.erc721);
    console.log(`%c ${nftComponentsERC721}`, 'background-color: yellow');
    

    const nftCardComponents = [];


    
    // if (whale) {

        // const url = `http://localhost:3000/database/getHoldings/${whale}`
        // axios.get(url).then(res => {
        //     whaleData.eth = res.data.eth;
        //     whaleData.erc721 = res.data.erc721;
        //     whaleData.erc20 = res.data.erc20;
        // }).then(() => {
        for (let address in nftComponentsERC721) {
            const { tokenName, tokenSymbol, value, tokenDecimal, tokenImage } = nftComponentsERC721[address];
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

    // if (loading) {
    //     return (
    //         <div id='isLoadingWrapper'>
    //             <Box sx={{ width: '60%' }}>
    //                 <LinearProgress />
    //             </Box>
    //         </div>
    //     )
    // }

    return (
        <div id="holdingsContainer">
            <h3>Holdings</h3>
            <MainContainer />
            <div className="erc721">
                <div className='nftContainer'>
                    {nftCardComponents}
                </div>
            </div>
            <div className="erc70"></div>
            <div className="eth"></div>
        </div>
    )
}

export default Holdings;