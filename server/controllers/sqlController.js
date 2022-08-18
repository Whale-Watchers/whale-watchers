const {query} = require('../models/whaleDataModels')
const fs = require("fs");
const path = require("path");

const sqlController = {};

const populateDatabase = () => {
  
  const readLocation = path.resolve(__dirname, "../data/dataDump.json");
  const allTransactions = JSON.parse(fs.readFileSync(readLocation));

  // TODO: must populate data in other rows before adding to Transactions, can do this in same for loop

//   allTransactions.slice(100).forEach(transaction => {
  for (let i = 0; i < 2; i++) {  
    const { timeStamp, hash, blockHash, from, to, value, contractAddress, tokenID, tokenSymbol, tokenDecimal } = allTransactions[i];
    let standard;
    if (contractAddress === '') standard = "ETH";
    else if (tokenDecimal === "0") standard = "ERC721"; 
    else standard = "ERC20";

    const values = [hash, timeStamp, standard, to, from, contractAddress, tokenID, value, blockHash];
    const text = `
    INSERT INTO Transactions (transaction_id, timestamp, standard, to_address, from_address, contract_address, token_id, value, block_hash)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;
    query(text, values)
  }
    
  
}

populateDatabase()

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
    "confirmations": "2241778"
},
  */