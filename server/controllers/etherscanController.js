const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const etherscanController = {};

etherscanController.getTimes = async (req, res, next) => {
  console.log('in etherscanController.getTrans middleware');
  const timeStampArray = [];
  const response = await fetch('https://api.etherscan.io/api?module=account&action=txlist&address=0xdbf2445e5049c04cda797dae60ac885e7d79df9d&startblock=0&endblock=999999999&sort=asc&apikey=NXZTP6HAGCIJH1D9UPIGEK8BDYH5RNG2AH');
  const body = await response.json();
  if(response.status !== 200){
    next({message: body.message});
  }
  body.result.forEach(element => {
    const date = new Date(element.timeStamp * 1000).toLocaleDateString('en-US');
    const time = new Date(element.timeStamp * 1000).toLocaleTimeString('en-US');
    timeStampArray.push(`${date} ${time}`);
    /*
    const date = new Date(element.timeStamp * 1000);
    const hours = date.getHours();
    const minutes = '0' + date.getMinutes();
    const seconds = '0' + date.getSeconds();
    timeStampArray.push(hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2));
    */
  })
  console.log('timeStampArray-->', timeStampArray);
  res.locals.times = timeStampArray;
  next();
}

etherscanController.convertTransactions = async (req, res, next) =>{
  console.log('in etherscanController.convertTransaction middleware');
  const valueArray = [];
  const response = await fetch('https://api.etherscan.io/api?module=account&action=txlist&address=0xdbf2445e5049c04cda797dae60ac885e7d79df9d&startblock=0&endblock=999999999&sort=asc&apikey=NXZTP6HAGCIJH1D9UPIGEK8BDYH5RNG2AH');
  const body = await response.json();
  if(response.status !== 200){
    next({message: body.message});
  }
  body.result.forEach(element => {
    valueArray.push(element.value /Math.pow(10, 18))
  })
  console.log('valueArray-->',valueArray);
  res.locals.values = valueArray
  next();
}

// 0x3b417faee9d2ff636701100891dc2755b5321cc3

// https://api.etherscan.io/api?module=account&action=tokennfttx&address=0x3b417faee9d2ff636701100891dc2755b5321cc3startblock=0&endblock=99999999&sort=asc&apikey=NXZTP6HAGCIJH1D9UPIGEK8BDYH5RNG2AH

// etherscanController.grabData = async (req, res, next) => {
//   console.log('in etherscanController.convertTransaction middleware');
//   const response = await fetch('https://api.etherscan.io/api?module=account&action=tokennfttx&address=0x3b417faee9d2ff636701100891dc2755b5321cc3&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=NXZTP6HAGCIJH1D9UPIGEK8BDYH5RNG2AH');
//   const body = await response.json();
//   if(response.status !== 200){
//     next({message: body.message});
//   }
//   //result.element.to
//   //result.element.contractAdress
//   const resultArray = body.result.map(element => {
//     const cache = {};
//     for (const key in element){
//       if(cache.hasOwnProperty(key)) cache[key].amount++;
//       else if(element[key] === 'contractAdress') {
//         cache[key] = element[key];
//         cache[key].tokenName = element.tokenName;
//         cache[key].tokenSymbol = element.tokenSymbol;
//         cache[key].amount = 1;
//       }
//     }
//   })

// }

/*

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
    {
      blockNumber: '12306877',
      timeStamp: '1619319775',
      hash: '0x1dae48f374d5aeb1616de87b87c17b47dbc3ce92ce59a1e6b61880c3aef9f9e6',
      nonce: '3125',
      blockHash: '0xb73e697ee8baad097bc2c1553c976b2cd8797eb035c74438b11551d862de00b3',
      from: '0x1aff1e0f1d5f76f92145a278d8c31af9ade783dd',
      contractAddress: '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb',
      to: '0x3b417faee9d2ff636701100891dc2755b5321cc3',
      value: '1',
      tokenName: 'CRYPTOPUNKS',
      tokenSymbol: 'Ͼ',
      tokenDecimal: '0',
      transactionIndex: '10',
      gas: '200000',
      gasPrice: '51000000000',
      gasUsed: '61240',
      cumulativeGasUsed: '349005',
      input: 'deprecated',
      confirmations: '2639128'
    }




*/

etherscanController.grabData = async (req, res, next) => {
  const address = req.params.id
  // const cryptoPunks = '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB';

  // const cryptoPunks = await fetch('https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB&address=0x3b417faee9d2ff636701100891dc2755b5321cc3&sort=asc&apikey=NXZTP6HAGCIJH1D9UPIGEK8BDYH5RNG2AH');
  const cryptoPunks = await fetch(`https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB&address=${address}&sort=asc&apikey=NXZTP6HAGCIJH1D9UPIGEK8BDYH5RNG2AH`);
  
  const crytpoPunksBody = await cryptoPunks.json();
  //console.log('crytpoPunksBody', ...crytpoPunksBody.result)
  //const response = await fetch('https://api.etherscan.io/api?module=account&action=tokennfttx&address=0x3b417faee9d2ff636701100891dc2755b5321cc3&startblock=0&endblock=99999999&sort=asc&apikey=NXZTP6HAGCIJH1D9UPIGEK8BDYH5RNG2AH');
  const response = await fetch(`https://api.etherscan.io/api?module=account&action=tokennfttx&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=NXZTP6HAGCIJH1D9UPIGEK8BDYH5RNG2AH`);
  
  const body = await response.json();
  // console.log(body);
  
  if (crytpoPunksBody.result.length !== 0) body.result.push(...crytpoPunksBody.result);
  // receive address of account in params
  // const address = '0x3b417faee9d2ff636701100891dc2755b5321cc3';
  // initialize result Object

  const resultArray = body.result.map(element => {
    if(element.to === address) return [element.timeStamp, element.contractAddress, 'buy', element.tokenName, element.tokenSymbol];
    return [element.timeStamp, element.contractAddress, 'sell', element.tokenName, element.tokenSymbol];
  })
  console.log('resultArray--->',resultArray);






  //changing to an array
  const resultObj = {};
  
  if(response.status !== 200){
    next({message: body.message});
  }

  body.result.forEach(transaction => {

    const { contractAddress } = transaction; 
    if (transaction.to === address) {
        const date = new Date(transaction.timeStamp * 1000).toLocaleDateString('en-US');
        const time = new Date(transaction.timeStamp * 1000).toLocaleTimeString('en-US');
        //timeStampArray.push(`${date} ${time}`);
      if(resultObj.hasOwnProperty(contractAddress)){
        resultObj[contractAddress].amount += 1;
        //resultObj[contractAddress].timeStamps.push({buy: transaction.timeStamp});
        resultObj[contractAddress].timeStamps.push({buy: `${date} ${time}`});

      }
      else {
        resultObj[contractAddress] = {};
        //resultObj[contractAddress].timeStamps = [{buy: transaction.timeStamp}]
        resultObj[contractAddress].timeStamps = [{buy: `${date} ${time}`}]

        resultObj[contractAddress].amount = 1;
        resultObj[contractAddress].tokenName = transaction.tokenName;
        resultObj[contractAddress].tokenSymbol = transaction.tokenSymbol;
      }
    }

    if (transaction.from === address) {
      if(resultObj.hasOwnProperty(contractAddress)){
        const date = new Date(transaction.timeStamp * 1000).toLocaleDateString('en-US');
        const time = new Date(transaction.timeStamp * 1000).toLocaleTimeString('en-US');
        // if (resultObj[contractAddress].amount >= 2) {
          resultObj[contractAddress].amount -= 1;
          
          //resultObj[contractAddress].timeStamps.push({sell: transaction.timeStamp});
          resultObj[contractAddress].timeStamps.push({sell: `${date} ${time}`});
        // }
        // else {
        //   delete resultObj[contractAddress];
        // }
      }
    }
  })
/*
[
  [timeStamp1, contractAddress, buy/sell, tokenName, tokenSymbol],
  [timeStamp2, contractAddress, buy/sell, tokenName, tokenSymbol],
]

iterate over array

  while(element[0] < inputTimeStamp) {
    
  } 
*/


  // [buy, contractadresss, timestamp]
  console.log('resultObj-->', resultObj['0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb']);
//   const resultArray = [];
//   for (const key in resultObj){
//     resultArray.push(resultObj)
//   }
  //console.log('result Array -->',resultArray)
  //res.locals.data = resultObj;
  res.locals.data = resultArray;

  next();
}
module.exports = etherscanController;

/*

{ "0x3b417faee9d2ff636701100891dc2755b5321cc3": {
    holdings: {
      0x74a69df3adc7235392374f728601e49807de4b30: {
        tokenname: "FUCK BUBBLE",
        "token symbol": "FB",
        amount: 0,
      },


  "0xa679c6154b8d4619af9f83f0bf9a13a680e01ecf": {
    holdings: {
      0x74a69df3adc7235392374f728601e49807de4b30: {
        tokenname: "FUCK BUBBLE",
        "token symbol": "FB",
        amount: 0,
      },

}

}

{
  address: "0x3b417faee9d2ff636701100891dc2755b5321cc3",
  holdings: {
    0x74a69df3adc7235392374f728601e49807de4b30: {
      tokenname: "FUCK BUBBLE",
      "token symbol": "FB",
      amount: 0,
    }
  }

  holdings: [
    {
      contractaddress: 0x74a69df3adc7235392374f728601e49807de4b30,
      tokenname: "FUCK BUBBLE",
      "token symbol": "FB",
      amount: 0,
    }
  ]
  
   }


*/
