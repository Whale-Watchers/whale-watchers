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
            // console.log(`%c ${transactionData}`, 'background-color: red');
            const nftComponentsData = await fetch(nftComponentsBackend + walletAddress).then(res => res.json())
            // console.log(`%c ${nftComponentsData.eth.value}`, 'background-color: magenta');
            const payload = {transactionData, nftComponentsData, currentWhale}
          
            dispatch(setWhaleActionCreator(payload))}
        setWhale(params.id)
    }
    
    const nftComponentsERC721 = useSelector(state => state.nfts.nftComponents.erc721);
    // console.log(`%c ${nftComponentsERC721}`, 'background-color: yellow');
    

    const nftCardComponents = [];


        for (let contractAddress in nftComponentsERC721) {
            const { tokenName, tokenSymbol, value, tokenDecimal, tokenIDs } = nftComponentsERC721[contractAddress];
            for (const token of tokenIDs){
                nftCardComponents.push(
                    <NFTCard
                        key={`contractAddress${token.tokenID}`}
                        address={contractAddress}
                        tokenName={tokenName}
                        tokenSymbol={tokenSymbol}
                        value={value}
                        tokenDecimal={tokenDecimal}
                        tokenImage={ contractAddress === '0xfb9e9e7150ccebfe42d58de1989c5283d0eaab2e' ? 'https://img.seadn.io/files/51808a3e78e8570ad54702d933f5bbae.png?fit=max&w=600' : token.tokenImage}
                        tokenID={token.tokenID}
                    />
                )
            }
        }

    if (nftCardComponents.length === 0) {
        return (
            <div id='isLoadingWrapper'>
                <Box sx={{ width: '60%' }}>
                    <LinearProgress />
                </Box>
            </div>
        )
    }

    return (
        <div>
            <div id='buttonscontainer'>
                <MainContainer />
            </div>
            <div id="holdingsContainer">
            <h3>Holdings</h3>
            
            <div className="erc721">
                <div className='nftContainer'>
                    {nftCardComponents}
                </div>
            </div>
            <div className="erc20"></div>
            <div className="eth"></div>
        </div>
        </div>
        
    )
}

export default Holdings;