const axios = require('axios');
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
require('dotenv').config();

const apiKey = process.env.ALCHEMY_API_KEY;
const tokenType = "erc721";

const alchemyController = {};

alchemyController.getTokenImage = async (req, res, next) => {

  const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getNFTMetadata`;

  const walletTransactions = res.locals.walletTransactions;

  for (const transaction of walletTransactions) {

    if (transaction.contractAddress === '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb') {
      transaction.imageURI = "https://img.seadn.io/files/8f9108cbbae163f656406ef5826b47d4.png?fit=max&auto=format";
    }
    else if(transaction.contractAddress === '0x482050b6a609630e717d5e3223b07e2aab20d259'){
      const url = `${baseURL}?contractAddress=0x59468516a8259058bad1ca5f8f4bff190d30e066&tokenId=${transaction.tokenID}&tokenType=${tokenType}`;
      
      await fetch(url)
      .then(response => response.json())
      .then(data => {
        transaction.imageURI = data.media[0].gateway;
      })
      .catch(error => next({
        log: `error in alchemyController.getTokenImage when fetching imageURI for erc721`,
        message: {err: `error in alchemyController.getTokenImage when fetching imageURI for erc721 ${error}`}
      }));
    }
    else if (transaction.hasOwnProperty('tokenID')) {
        
      const url = `${baseURL}?contractAddress=${transaction.contractAddress}&tokenId=${transaction.tokenID}&tokenType=${tokenType}`;
      
      await fetch(url)
      .then(response => response.json())
      .then(data => {
        transaction.imageURI = data.media[0].gateway;
      })
      .catch(error => next({
        log: `error in alchemyController.getTokenImage when fetching imageURI for erc721`,
        message: {err: `error in alchemyController.getTokenImage when fetching imageURI for erc721 ${error}`}
      }));
    }
  }

  return next();
}
module.exports = alchemyController;