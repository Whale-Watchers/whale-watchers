const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const etherscanController = {};

etherscanController.get721Transactions = async (req, res, next) => {
  const { address } = req.params;

  const cryptoPunksData = await fetch(`https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB&address=${address}&sort=asc&apikey=NXZTP6HAGCIJH1D9UPIGEK8BDYH5RNG2AH`);
  const cryptoPunksBody = await cryptoPunksData.json();
  // console.log('cryptoPunksBody', cryptoPunksBody);

  const erc721Data = await fetch(`https://api.etherscan.io/api?module=account&action=tokennfttx&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=NXZTP6HAGCIJH1D9UPIGEK8BDYH5RNG2AH`);
  const erc721Body = await erc721Data.json();
  // console.log('erc721Body', erc721Body);

  if(erc721Data.status !== 200){
    next({ message: erc721Body.message });
  }
  
  if (erc721Body.result.length !== 0) erc721Body.result.push(...cryptoPunksBody.result);
  // console.log('erc721Body first entry', erc721Body.result[erc721Body.result.length - 1]);

  const all721Transactions = {
    address: address,
    transactions: {},
  }

  erc721Body.result.forEach(transaction => {
    all721Transactions.transactions[transaction.timeStamp] = {
      toAddress: transaction.to,
      fromAddress: transaction.from,
      tokenName: transaction.tokenName,
      tokenSymbol: transaction.tokenSymbol
    };
    if (transaction.to === address) {
      all721Transactions.transactions[transaction.timeStamp] = { ...all721Transactions.transactions[transaction.timeStamp], type: 'buy' }
    }
    else if (transaction.from === address) { 
      all721Transactions.transactions[transaction.timeStamp] = { ...all721Transactions.transactions[transaction.timeStamp], type: 'sell' };
    }
  });

  res.locals.all721Transactions = all721Transactions;

  res.locals.allTransactions = { address: address };
  res.locals.allTransactions = { all721Transactions: all721Transactions.transactions };

  next();
}

etherscanController.get20Transactions = async (req, res, next) => {
  const { address } = req.params;

  const erc20Data = await fetch(`https://api.etherscan.io/api?module=account&action=tokentx&address=${address}&sort=asc&apikey=NXZTP6HAGCIJH1D9UPIGEK8BDYH5RNG2AH`);
  const erc20Body = await erc20Data.json();
  // console.log(erc20Body);

  const all20Transactions = {
    address: address,
    transactions: {},
  }

  // TO DO: Call function that converts transaction.value to normalized value

  erc20Body.result.forEach(transaction => {
    all20Transactions.transactions[transaction.timeStamp] = {
      contractAddress: transaction.contractAddress,
      toAddress: transaction.to,
      fromAddress: transaction.from,
      value: transaction.value,
      tokenName: transaction.tokenName,
      tokenSymbol: transaction.tokenSymbol
    };
    if (transaction.to === address) {
      all20Transactions.transactions[transaction.timeStamp] = { ...all20Transactions.transactions[transaction.timeStamp], type: 'buy' }
    }
    else if (transaction.from === address) { 
      all20Transactions.transactions[transaction.timeStamp] = { ...all20Transactions.transactions[transaction.timeStamp], type: 'sell' };
    }
  });

  res.locals.all20Transactions = all20Transactions;

  res.locals.allTransactions = {
    ...res.locals.allTransactions,
    all20Transactions: all20Transactions.transactions,
  } 

  next();
}

module.exports = etherscanController;

/*
 blockNumber: '12306877',
[0]   timeStamp: '1619319775',
[0]   hash: '0x1dae48f374d5aeb1616de87b87c17b47dbc3ce92ce59a1e6b61880c3aef9f9e6',
[0]   nonce: '3125',
[0]   blockHash: '0xb73e697ee8baad097bc2c1553c976b2cd8797eb035c74438b11551d862de00b3',
[0]   from: '0x1aff1e0f1d5f76f92145a278d8c31af9ade783dd',
[0]   contractAddress: '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb',
[0]   to: '0x3b417faee9d2ff636701100891dc2755b5321cc3',
[0]   value: '1',
[0]   tokenName: 'CRYPTOPUNKS',
[0]   tokenSymbol: 'Ͼ',
[0]   tokenDecimal: '0',
[0]   transactionIndex: '10',
[0]   gas: '200000',
[0]   gasPrice: '51000000000',
[0]   gasUsed: '61240',
[0]   cumulativeGasUsed: '349005',
[0]   input: 'deprecated',
[0]   confirmations: '2641280'
[0] }
*/


// etherscanController.getTimes = async (req, res, next) => {
//   console.log('in etherscanController.getTrans middleware');
//   const timeStampArray = [];
//   const response = await fetch('https://api.etherscan.io/api?module=account&action=txlist&address=0xdbf2445e5049c04cda797dae60ac885e7d79df9d&startblock=0&endblock=999999999&sort=asc&apikey=NXZTP6HAGCIJH1D9UPIGEK8BDYH5RNG2AH');
//   const body = await response.json();
//   if(response.status !== 200){
//     next({message: body.message});
//   }
//   body.result.forEach(element => {
//     const date = new Date(element.timeStamp * 1000).toLocaleDateString('en-US');
//     const time = new Date(element.timeStamp * 1000).toLocaleTimeString('en-US');
//     timeStampArray.push(`${date} ${time}`);
//     /*
//     const date = new Date(element.timeStamp * 1000);
//     const hours = date.getHours();
//     const minutes = '0' + date.getMinutes();
//     const seconds = '0' + date.getSeconds();
//     timeStampArray.push(hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2));
//     */
//   })
//   console.log('timeStampArray-->', timeStampArray);
//   res.locals.times = timeStampArray;
//   next();
// }

// etherscanController.convertTransactions = async (req, res, next) =>{
//   console.log('in etherscanController.convertTransaction middleware');
//   const valueArray = [];
//   const response = await fetch('https://api.etherscan.io/api?module=account&action=txlist&address=0xdbf2445e5049c04cda797dae60ac885e7d79df9d&startblock=0&endblock=999999999&sort=asc&apikey=NXZTP6HAGCIJH1D9UPIGEK8BDYH5RNG2AH');
//   const body = await response.json();
//   if(response.status !== 200){
//     next({message: body.message});
//   }
//   body.result.forEach(element => {
//     valueArray.push(element.value /Math.pow(10, 18))
//   })
//   console.log('valueArray-->',valueArray);
//   res.locals.values = valueArray
//   next();
// }

// // 0x3b417faee9d2ff636701100891dc2755b5321cc3

// // https://api.etherscan.io/api?module=account&action=tokennfttx&address=0x3b417faee9d2ff636701100891dc2755b5321cc3startblock=0&endblock=99999999&sort=asc&apikey=NXZTP6HAGCIJH1D9UPIGEK8BDYH5RNG2AH

// // etherscanController.grabData = async (req, res, next) => {
// //   console.log('in etherscanController.convertTransaction middleware');
// //   const response = await fetch('https://api.etherscan.io/api?module=account&action=tokennfttx&address=0x3b417faee9d2ff636701100891dc2755b5321cc3&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=NXZTP6HAGCIJH1D9UPIGEK8BDYH5RNG2AH');
// //   const body = await response.json();
// //   if(response.status !== 200){
// //     next({message: body.message});
// //   }
// //   //result.element.to
// //   //result.element.contractAdress
// //   const resultArray = body.result.map(element => {
// //     const cache = {};
// //     for (const key in element){
// //       if(cache.hasOwnProperty(key)) cache[key].amount++;
// //       else if(element[key] === 'contractAdress') {
// //         cache[key] = element[key];
// //         cache[key].tokenName = element.tokenName;
// //         cache[key].tokenSymbol = element.tokenSymbol;
// //         cache[key].amount = 1;
// //       }
// //     }
// //   })

// // }

// /*

