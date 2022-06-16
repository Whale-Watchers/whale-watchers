// const db = require("../models/whaleDataModels.js");
const { RequestHandler } = require("express");
const fs = require("fs");
const path = require("path");
// const erc721ImageScraper = require('../scrapers/erc721ImageScraper');
const looksRareController = require('./looksRareController');

const databaseController = {};

// helper function for value conversion
const convertVal = (value, tokenDecimal) => {
  return (value / Math.pow(10, tokenDecimal));
}

/** @type {RequestHandler} */
databaseController.getTransactions = (req, res, next) => {
  const { walletAddress } = req.params;
  const readLocation = path.resolve(__dirname, "../data/dataDump.json");
  const allTransactions = JSON.parse(fs.readFileSync(readLocation));

  const nftLocation = '../data/nftprices.json';
  const relevantErc721 = JSON.parse(fs.readFileSync(path.resolve(__dirname, nftLocation)));
  const erc20Location = '../data/erc20Images.json';
  const relevantErc20 = JSON.parse(fs.readFileSync(path.resolve(__dirname, erc20Location)));

  const walletTransactions = allTransactions.reduce((acc, transaction) => {
    if (transaction.to == walletAddress || transaction.from == walletAddress) {
      if (transaction.value !== undefined) {
        transaction.value = convertVal(Number(transaction.value), transaction.tokenDecimal === undefined ? 18 : Number(transaction.tokenDecimal))
      } 
      acc.push(transaction);
    }
    return acc;
    }, []) 

  const relevantWalletTransactions = [];

  walletTransactions.forEach(transaction => {
    relevantErc20.forEach(token => {
      if (transaction.contractAddress === token.contractAddress) {
        relevantWalletTransactions.push(transaction);
      };
    });

    relevantErc721.forEach(nft => {
      if (transaction.contractAddress === nft.contractAddress) {
        relevantWalletTransactions.push(transaction);
      };
    });
  });

  res.locals.allTransactions = allTransactions;
  res.locals.walletTransactions = relevantWalletTransactions;
  return next();
};

/** @type {RequestHandler} */
databaseController.calculateHoldings = async (req, res, next) => {
  const { walletAddress } = req.params;
  const walletTransactions = res.locals.walletTransactions;

  // const nftLocation = '../data/nftprices.json';
  // const relevantErc721 = JSON.parse(fs.readFileSync(path.resolve(__dirname, nftLocation)));
  // const erc20Location = '../data/erc20Images.json';
  // const relevantErc20 = JSON.parse(fs.readFileSync(path.resolve(__dirname, erc20Location)));

  const holdings = {
    eth: {
      contractAddress: "",
      tokenName: "Ether",
      tokenSymbol: "ETH",
      value: 0,
      tokenDecimal: 18,
      tokenImage: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png'
    },
    erc20: {},
    erc721: {},
  };

  for (let transaction of walletTransactions) {
      // ETH transactions
      if (transaction.contractAddress === "") {
        if (transaction.to === walletAddress) {
          holdings.eth.value += transaction.value;
        } else if (transaction.from === walletAddress) {
          holdings.eth.value -= transaction.value;
          if(holdings.eth.value <= 0) holdings.eth.value = 0.15;
        }
      }

      // ERC-20 transcations
      if (Number(transaction.tokenDecimal) > 0) {
        if (transaction.to === walletAddress) {
          if (holdings.erc20[transaction.contractAddress] === undefined) {
            holdings.erc20[transaction.contractAddress] = {
              tokenName: transaction.tokenName,
              tokenSymbol: transaction.tokenSymbol,
              value: transaction.value,
              tokenDecimal: transaction.tokenDecimal,
            };
          } else {
            holdings.erc20[transaction.contractAddress].value += transaction.value;
          }
        } else if (transaction.from === walletAddress && holdings.erc20[transaction.contractAddress]) {
          holdings.erc20[transaction.contractAddress].value -= transaction.value;

          if (holdings.erc20[transaction.contractAddress].value === 0) {
            delete holdings.erc20[transaction.contractAddress];
          }
        }
      }

      // ERC-721 transcations
      if (Number(transaction.tokenDecimal) === 0) {
        if (transaction.to === walletAddress) {
          if (holdings.erc721[transaction.contractAddress] === undefined) {
            holdings.erc721[transaction.contractAddress] = {
              tokenName: transaction.tokenName,
              tokenSymbol: transaction.tokenSymbol,
              tokenIDs: [
                { 
                  tokenID: transaction.tokenID,
                  tokenImage: await looksRareController.getTokenImage(transaction.contractAddress, transaction.tokenID)
                }
              ],
              value: 1,
              tokenDecimal: transaction.tokenDecimal,
            };
          } 
          else {
            holdings.erc721[transaction.contractAddress].value += 1;
            holdings.erc721[transaction.contractAddress].tokenIDs.push(
              { 
                tokenID: transaction.tokenID,
                tokenImage: await looksRareController.getTokenImage(transaction.contractAddress, transaction.tokenID)
              }
            );
          }
        } 
        else if (transaction.from === walletAddress && holdings.erc721[transaction.contractAddress]) {
          holdings.erc721[transaction.contractAddress].value -= 1;
          const tokenIDsLeft = [];
          holdings.erc721[transaction.contractAddress].tokenIDs.forEach(tokenID => {
            if (tokenID.tokenID !== transaction.tokenID) {
              tokenIDsLeft.push(tokenID);
            }
          })
          holdings.erc721[transaction.contractAddress].tokenID = tokenIDsLeft;

          if (holdings.erc721[transaction.contractAddress].value === 0) {
            delete holdings.erc721[transaction.contractAddress];
          }
        }
      }
  }

  // const relevantHoldings = {
  //   eth: holdings.eth,
  //   erc20: {},
  //   erc721: {},
  // };

  // Object.keys(holdings.erc20).forEach(contractAddress => {
  //   relevantErc20.forEach(token => {
  //     if (contractAddress === token.contractAddress) {
  //       relevantHoldings.erc20[contractAddress] = holdings.erc20[contractAddress];
  //       relevantHoldings.erc20[contractAddress].tokenImage = token.tokenImage;
  //     };
  //   });
  // });

  // Object.keys(holdings.erc721).forEach(contractAddress => {
  //   relevantErc721.forEach(nft => {
  //     if (contractAddress === nft.contractAddress) {
  //       relevantHoldings.erc721[contractAddress] = holdings.erc721[contractAddress];
  //       relevantHoldings.erc721[contractAddress].tokenImage = nft.tokenImage;        
  //     }
  //   }) 
  // })

  res.locals.holdings = holdings;


  return next();
};

module.exports = databaseController;
/*
  const holdings = {
    eth: [
      {
        contractAddress: "", *****
        tokenName: "Ether", (not available!)
        tokenSymbol: "ETH", (not available!)
        value: 0,
        tokenDecimal: WEI, (not available!)
      },
    ]
    
    erc20: [
      {
        contractAddress: "0xdb0acc14396d108b3c5574483acb817855c9dc8d",
        tokenName: "Emblem",
        tokenSymbol: "EMB",
        value: 0,
        tokenDecimal: "8", *****
      },
    ]

    erc721: 
      {
        contractAddress: "0x74a69df3adc7235392374f728601e49807de4b30",
        tokenName: "Misfit University Official",
        tokenSymbol: "MU",
        tokenID: "1409",
        value: 0,
        tokenDecimal: 0, *****
      },
    
  }
  */
/* 

ETH Transaction example
  {
    "blockNumber": "12241461",
    "timeStamp": "1618447160",
    "hash": "0x84c0a71535184a140aa7389e5290c5ea82e4f7d0908459139d8161bdb97283df",
    "nonce": "0",
    "blockHash": "0xd3af80fa823024945d29df741e9c1ca24b2155471b9443ee56b78a479496567f",
    "transactionIndex": "183",
    "from": "0xe95ccf284efe70f1381952a687fd7bc95d9cc2b7",
    "to": "0x3b417faee9d2ff636701100891dc2755b5321cc3",
    "value": "6149279920000000000",
    "gas": "21000",
    "gasPrice": "143000000000",
    "isError": "0",
    "txreceipt_status": "1",
    "input": "0x",
    "contractAddress": "",
    "cumulativeGasUsed": "7817950",
    "gasUsed": "21000",
    "confirmations": "2710385"
  },

ERC20 Transaction example

 {
    "blockNumber": "13046292",
    "timeStamp": "1629250442",
    "hash": "0x211ed14e479328f20d99cab6ecc732db02b4f4c0d0e68ffa869f6949d6f93256",
    "nonce": "433",
    "blockHash": "0x1fe3a063683b8546e40c0215652d69dc464b7c8c6578e1699c39f6b82ebfd868",
    "from": "0x761037a6d0863c0dca45f6dc783f2127f00f7f40",
    "contractAddress": "0xdb0acc14396d108b3c5574483acb817855c9dc8d",
    "to": "0x3b417faee9d2ff636701100891dc2755b5321cc3",
    "value": "44400000000",
    "tokenName": "Emblem",
    "tokenSymbol": "EMB",
    "tokenDecimal": "8",
    "transactionIndex": "35",
    "gas": "81400",
    "gasPrice": "67000000000",
    "gasUsed": "54267",
    "cumulativeGasUsed": "2835533",
    "input": "deprecated",
    "confirmations": "1905554"
  },

ERC721 Transaction example
{
    "blockNumber": "12703694",
    "timeStamp": "1624629835",
    "hash": "0x9c04def73979c0e5157b86871d66a940ce1bf10176f054fd52ba4af9fbd1124b",
    "nonce": "235",
    "blockHash": "0x868777ac0ab15d960b8e3fd2464f14f808b2bde74f836f56374a97ac5354b39e",
    "from": "0xd0032a23ba9a998d472f71c6c55e493197c96ab8",
    "contractAddress": "0x74a69df3adc7235392374f728601e49807de4b30",
    "to": "0x3b417faee9d2ff636701100891dc2755b5321cc3",
    "tokenID": "1409",
    "tokenName": "Misfit University Official",
    "tokenSymbol": "MU",
    "tokenDecimal": "0",
    "transactionIndex": "176",
    "gas": "62605",
    "gasPrice": "33000000000",
    "gasUsed": "62605",
    "cumulativeGasUsed": "11600403",
    "input": "deprecated",
    "confirmations": "2241778",
    "tokenImage": 'URL"
},

*/

// /** @type {RequestHandler} */
// databaseController.getSqlTransactions = (req, res, next) => {
//   const { userID } = req.query;
//   const values = [userID];
//   const query = `
//     SELECT t.*
//     FROM transactions t
//     LEFT OUTER JOIN userTable u
//     ON t.userID = u.userID
//     LEFT OUTER JOIN transactionRefTable trt
//     ON t.contractAddress = rft.contractAddress
//     ORDER BY t.timeStamp ASC
//     WHERE t.userID = $1
//   `;

//   db.query(query, values)
//     .then((result) => {
//       res.locals.allTransactions = result.rows;
//       return next();
//     })
//     .catch((err) => {
//       console.log(err);
//       return next({
//         log: "databaseController.getTransactions: An ERROR occurred querying transactions table",
//         message: {
//           err: "An ERROR occurred getting transaction data",
//         },
//       });
//     });
// };
