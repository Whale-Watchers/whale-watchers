const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const fs = require("fs");
const path = require("path");

const etherscanController = {};

etherscanController.get721Transactions = async (req, res, next) => {
  const { address } = req.params;

  const cryptoPunksData = await fetch(
    `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB&address=${address}&sort=asc&apikey=NXZTP6HAGCIJH1D9UPIGEK8BDYH5RNG2AH`
  );
  const cryptoPunksBody = await cryptoPunksData.json();
  // console.log('cryptoPunksBody', cryptoPunksBody);

  const erc721Data = await fetch(
    `https://api.etherscan.io/api?module=account&action=tokennfttx&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=NXZTP6HAGCIJH1D9UPIGEK8BDYH5RNG2AH`
  );
  const erc721Body = await erc721Data.json();
  // console.log('erc721Body', erc721Body);

  if (erc721Data.status !== 200) {
    return next({ message: erc721Body.message });
  }

  if (erc721Body.result.length !== 0)
    erc721Body.result.push(...cryptoPunksBody.result);
  // console.log('erc721Body first entry', erc721Body.result[erc721Body.result.length - 1]);

  const all721Transactions = {
    address: address,
    transactions: {},
  };

  erc721Body.result.forEach((transaction) => {
    all721Transactions.transactions[transaction.timeStamp] = {
      toAddress: transaction.to,
      fromAddress: transaction.from,
      tokenName: transaction.tokenName,
      tokenSymbol: transaction.tokenSymbol,
    };
    if (transaction.to === address) {
      all721Transactions.transactions[transaction.timeStamp] = {
        ...all721Transactions.transactions[transaction.timeStamp],
        type: "buy",
      };
    } else if (transaction.from === address) {
      all721Transactions.transactions[transaction.timeStamp] = {
        ...all721Transactions.transactions[transaction.timeStamp],
        type: "sell",
      };
    }
  });

  res.locals.all721Transactions = all721Transactions;

  res.locals.allTransactions = { address: address };
  res.locals.allTransactions = {
    all721Transactions: all721Transactions.transactions,
  };

  return next();
};

etherscanController.get20Transactions = async (req, res, next) => {
  const { address } = req.params;

  const erc20Data = await fetch(
    `https://api.etherscan.io/api?module=account&action=tokentx&address=${address}&sort=asc&apikey=NXZTP6HAGCIJH1D9UPIGEK8BDYH5RNG2AH`
  );
  const erc20Body = await erc20Data.json();
  // console.log(erc20Body);

  const all20Transactions = {
    address: address,
    transactions: {},
  };

  erc20Body.result.forEach((transaction) => {
    all20Transactions.transactions[transaction.timeStamp] = {
      contractAddress: transaction.contractAddress,
      toAddress: transaction.to,
      fromAddress: transaction.from,
      value: transaction.value,
      tokenName: transaction.tokenName,
      tokenSymbol: transaction.tokenSymbol,
    };
    if (transaction.to === address) {
      all20Transactions.transactions[transaction.timeStamp] = {
        ...all20Transactions.transactions[transaction.timeStamp],
        type: "buy",
      };
    } else if (transaction.from === address) {
      all20Transactions.transactions[transaction.timeStamp] = {
        ...all20Transactions.transactions[transaction.timeStamp],
        type: "sell",
      };
    }
  });

  res.locals.all20Transactions = all20Transactions;

  res.locals.allTransactions = {
    ...res.locals.allTransactions,
    all20Transactions: all20Transactions.transactions,
  };

  return next();
};

etherscanController.dataDump = async (req, res, next) => {
  const { address } = req.params;
  console.log("req.params", req.params);
  console.log("address", address);

  const ethData = await fetch(
    `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=NXZTP6HAGCIJH1D9UPIGEK8BDYH5RNG2AH`
  );
  const ethBody = await ethData.json();

  const erc20Data = await fetch(
    `https://api.etherscan.io/api?module=account&action=tokentx&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=NXZTP6HAGCIJH1D9UPIGEK8BDYH5RNG2AH`
  );
  const erc20Body = await erc20Data.json();

  const erc721Data = await fetch(
    `https://api.etherscan.io/api?module=account&action=tokennfttx&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=NXZTP6HAGCIJH1D9UPIGEK8BDYH5RNG2AH`
  );
  const erc721Body = await erc721Data.json();

  if (ethData.status !== 200) {
    next({
      message: `error processing ethData for ${address}: ERROR: ${ethData.message}`,
    });
  } else if (erc20Data.status !== 200) {
    next({
      message: `error processing erc20Data for ${address}: ERROR: ${erc20Data.message}`,
    });
  } else if (erc721Data.status !== 200) {
    next({
      message: `error processing erc721data for ${address}: ERROR: ${erc721Data.message}`,
    });
  }
  const output = [];

  for (let tx of ethBody.result) {
    output.push(tx);
  }
  for (let tx of erc20Body.result) {
    output.push(tx);
  }
  for (let tx of erc721Body.result) {
    output.push(tx);
  }

  const writeLocation = path.resolve(__dirname, `../data/testDump.json`);
  fs.appendFileSync(writeLocation, JSON.stringify(output, null, 2));

  return next();
};

module.exports = etherscanController;

  // const whaleAddresses = {
  //   "0x3b417faee9d2ff636701100891dc2755b5321cc3": "Jay-Z",
  //   "0x7217bc604476859303a27f111b187526231a300c": "Mike Tyson",
  //   "0xd2aff66959ee0e6f92ee02d741071ddb5084bebb": "Blau",
  //   "0x3becf83939f34311b6bee143197872d877501b11": "Stephen Curry",
  //   "0xe4bbcbff51e61d0d95fcc5016609ac8354b177c4": "Steve Aoki",
  //   "0xc1064e3662b0718357e9050694a3bfeaabede8ab": "LaMello Ball",
  //   "0x3781d92e5449b5b689fee308ded44882085b6312": "Lindsay Lohan",
  //   "0xa679c6154b8d4619af9f83f0bf9a13a680e01ecf": "Mark Cuban",
  //   "0xc6b0562605d35ee710138402b878ffe6f2e23807": "Beeple",
  //   "0xce90a7949bb78892f159f428d0dc23a8e3584d75": "Snoop Dog",
  //   "0x8d3bc45d7b30013c37c141f6ce7c981b2613efaa": "JaRule",
  //   "0x0864224f3cc570ab909ebf619f7583ef4a50b826": "Serena Williams",
  //   "0x0ed1e02164a2a9fad7a9f9b5b9e71694c3fad7f2": "Alexis Ohanian",
  //   "0xb55eb9bd32d6ab75d7555192e7a3a7ca0bcd5738": "Mike Shinoda",
  //   "0x3c6aeff92b4b35c2e1b196b57d0f8ffb56884a17": "Shaquille O'Neal",
  //   "0xf6de94be96f80602d90bf29bd9e88a0e843b2eb9": "Elijah Wood",
  //   "0x9114b66e4bd387eb832d1477e86ede0cf7f76115": "Seth Curry",
  //   "0x35cded880959f93c415723902f91f964367a4dcd": "Joel Madden",
  //   "0x7948aa99e095dbfc1971bc8d2d1173893146630e": "Reese Witherspoon",
  //   "0xdbf2445e5049c04cda797dae60ac885e7d79df9d": "Jordan Belfort",
  //   "0xa0eaf6b0df87132c9a28e450a43c1d906defb60b": "DJ Marshmello",
  //   "0x4b1bdae6b46c2ed904581d7e4bf2b71e5f3f7072": "Timbaland",
  //   "0xc86b12d850fdbbf3260a7baae862f85857aadbba": "Lil Baby",
  //   "0x0394451c1238cec1e825229e692aa9e428c107d8": "Jimmy Fallon",
  //   "0xbea020c3bd417f30de4d6bd05b0ed310ac586cc0": "Post Malone",
  //   "0xff0bd4aa3496739d5667adc10e2b843dfab5712b": "LOgan Paul",
  //   "0xd6a984153acb6c9e2d788f08c2465a1358bb89a7": "Gary Vee",
  //   "0xb6aa5a1aa37a4195725cdf1576dc741d359b56bd": "Paris Hilton",
  //   "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d": "Neymar",
  //   "0xbbdac7ba85af15420afd1f4aa3313c3535b15cde": "Kevin Hart",
  //   "0x31185f782a7c11044566d70dfcf1c8175486f451": "Gwyneth Paltrow",
  //   "0xaa1b056286a66a9e6752c26776ac034c662a51d5": "Eva Longoria",
  //   "0x58473e9ac681c4424ca74619281ff71801d002d6": "Dillon Francis",
  //   "0x6ef962ea7e64e771d3a81bce4f95328d76d7672b": "Madonna",
  // };


// {
//     "blockNumber": "12703694",
//     "timeStamp": "1624629835",
//     "hash": "0x9c04def73979c0e5157b86871d66a940ce1bf10176f054fd52ba4af9fbd1124b",
//     "nonce": "235",
//     "blockHash": "0x868777ac0ab15d960b8e3fd2464f14f808b2bde74f836f56374a97ac5354b39e",
//     "from": "0xd0032a23ba9a998d472f71c6c55e493197c96ab8",
//     "contractAddress": "0x74a69df3adc7235392374f728601e49807de4b30",
//     "to": "0x3b417faee9d2ff636701100891dc2755b5321cc3",
//     "tokenID": "1409",
//     "tokenName": "Misfit University Official",
//     "tokenSymbol": "MU",
//     "tokenDecimal": "0",
//     "transactionIndex": "176",
//     "gas": "62605",
//     "gasPrice": "33000000000",
//     "gasUsed": "62605",
//     "cumulativeGasUsed": "11600403",
//     "input": "deprecated",
//     "confirmations": "2241778"
// },
//     {
//       blockNumber: '12306877',
//       timeStamp: '1619319775',
//       hash: '0x1dae48f374d5aeb1616de87b87c17b47dbc3ce92ce59a1e6b61880c3aef9f9e6',
//       nonce: '3125',
//       blockHash: '0xb73e697ee8baad097bc2c1553c976b2cd8797eb035c74438b11551d862de00b3',
//       from: '0x1aff1e0f1d5f76f92145a278d8c31af9ade783dd',
//       contractAddress: '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb',
//       to: '0x3b417faee9d2ff636701100891dc2755b5321cc3',
//       value: '1',
//       tokenName: 'CRYPTOPUNKS',
//       tokenSymbol: 'Ͼ',
//       tokenDecimal: '0',
//       transactionIndex: '10',
//       gas: '200000',
//       gasPrice: '51000000000',
//       gasUsed: '61240',
//       cumulativeGasUsed: '349005',
//       input: 'deprecated',
//       confirmations: '2639128'
//     }

// */

// etherscanController.grabData = async (req, res, next) => {
//   const address = req.params.id
//   console.log('address', address)
//   // const cryptoPunks = '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB';

//   // const cryptoPunks = await fetch('https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB&address=0x3b417faee9d2ff636701100891dc2755b5321cc3&sort=asc&apikey=NXZTP6HAGCIJH1D9UPIGEK8BDYH5RNG2AH');
//   const cryptoPunks = await fetch(`https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB&address=${address}&sort=asc&apikey=NXZTP6HAGCIJH1D9UPIGEK8BDYH5RNG2AH`);

//   const crytpoPunksBody = await cryptoPunks.json();
//   //console.log('crytpoPunksBody', ...crytpoPunksBody.result)
//   //const response = await fetch('https://api.etherscan.io/api?module=account&action=tokennfttx&address=0x3b417faee9d2ff636701100891dc2755b5321cc3&startblock=0&endblock=99999999&sort=asc&apikey=NXZTP6HAGCIJH1D9UPIGEK8BDYH5RNG2AH');
//   const response = await fetch(`https://api.etherscan.io/api?module=account&action=tokennfttx&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=NXZTP6HAGCIJH1D9UPIGEK8BDYH5RNG2AH`);

//   const body = await response.json();
//   console.log(body);

//   if (crytpoPunksBody.result.length !== 0) body.result.push(...crytpoPunksBody.result);
//   // receive address of account in params
//   // const address = '0x3b417faee9d2ff636701100891dc2755b5321cc3';
//   // initialize result Object

//   const resultArray = body.result.map(element => {
//     if(element.to === address) return [element.timeStamp, element.contractAddress, 'buy', element.tokenName, element.tokenSymbol];
//     return [element.timeStamp, element.contractAddress, 'sell', element.tokenName, element.tokenSymbol];
//   })
//   console.log('resultArray--->',resultArray);

//   //changing to an array
//   const resultObj = {};

//   if(response.status !== 200){
//     next({message: body.message});
//   }

//   body.result.forEach(transaction => {

//     const { contractAddress } = transaction;
//     if (transaction.to === address) {
//         const date = new Date(transaction.timeStamp * 1000).toLocaleDateString('en-US');
//         const time = new Date(transaction.timeStamp * 1000).toLocaleTimeString('en-US');
//         //timeStampArray.push(`${date} ${time}`);
//       if(resultObj.hasOwnProperty(contractAddress)){
//         resultObj[contractAddress].amount += 1;
//         //resultObj[contractAddress].timeStamps.push({buy: transaction.timeStamp});
//         resultObj[contractAddress].timeStamps.push({buy: `${date} ${time}`});

//       }
//       else {
//         resultObj[contractAddress] = {};
//         //resultObj[contractAddress].timeStamps = [{buy: transaction.timeStamp}]
//         resultObj[contractAddress].timeStamps = [{buy: `${date} ${time}`}]

//         resultObj[contractAddress].amount = 1;
//         resultObj[contractAddress].tokenName = transaction.tokenName;
//         resultObj[contractAddress].tokenSymbol = transaction.tokenSymbol;
//       }
//     }

//     if (transaction.from === address) {
//       if(resultObj.hasOwnProperty(contractAddress)){
//         const date = new Date(transaction.timeStamp * 1000).toLocaleDateString('en-US');
//         const time = new Date(transaction.timeStamp * 1000).toLocaleTimeString('en-US');
//         // if (resultObj[contractAddress].amount >= 2) {
//           resultObj[contractAddress].amount -= 1;

//           //resultObj[contractAddress].timeStamps.push({sell: transaction.timeStamp});
//           resultObj[contractAddress].timeStamps.push({sell: `${date} ${time}`});
//         // }
//         // else {
//         //   delete resultObj[contractAddress];
//         // }
//       }
//     }
//   })
// /*
// [
//   [timeStamp1, contractAddress, buy/sell, tokenName, tokenSymbol],
//   [timeStamp2, contractAddress, buy/sell, tokenName, tokenSymbol],
// ]

// iterate over array

//   while(element[0] < inputTimeStamp) {

//   }
// */

//   // [buy, contractadresss, timestamp]
//   console.log('resultObj-->', resultObj['0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb']);
// //   const resultArray = [];
// //   for (const key in resultObj){
// //     resultArray.push(resultObj)
// //   }
//   //console.log('result Array -->',resultArray)
//   //res.locals.data = resultObj;
//   res.locals.data = resultArray;

//   next();
// }

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
