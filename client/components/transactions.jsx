import React, { Component } from 'react';

class Transactions extends Component {
    constructor(props) {
        super(props)
        this.state = {
          data : null
        }
    }
    componentDidMount(){
      console.log('component mounted')
      fetch('http://localhost:3000/database/getTransactions/0x3b417faee9d2ff636701100891dc2755b5321cc3')
      .then(res => res.json())
      .then(res => {
        
        //console.log('transactions-->', );
        this.setState({data : res})
      })
      .catch(err => console.log("ERROR:", err))
    }

    render() {
      //var nftSorted = [];
      console.log('state', this.state)
      let sample = <p>hello</p>
      const nftprices = [
            {
              "name" : "CryptoPunks",
              "price"	: "48.24",
              "contractAdress": "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
              "tokenImage": "https://img-ae.seadn.io/https%3A%2F%2Flh3.googleusercontent.com%2FBdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE%3Ds10000?fit=max&h=120&w=120&auto=format&s=5eab9dfe19106ac590e683947112951b"
            },
            {
              "name" : "Bored Ape Yacht Club",
              "price"	: "83.00",
              "contractAdress": "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
              "tokenImage": "https://img-ae.seadn.io/https%3A%2F%2Flh3.googleusercontent.com%2FJu9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB%3Ds10000?fit=max&h=120&w=120&auto=format&s=9719c84d198704a4b1bf7519f6f52256"
            },
            {
              "name" : "Mutant Ape Yacht Club",
              "price"	: "16.59",
              "contractAdress" : "0x60e4d786628fea6478f785a6d7e704777c86a7c6",
              "tokenImage": "https://img-ae.seadn.io/https%3A%2F%2Flh3.googleusercontent.com%2FlHexKRMpw-aoSyB1WdFBff5yfANLReFxHzt1DOj_sg7mS14yARpuvYcUtsyyx-Nkpk6WTcUPFoG53VnLJezYi8hAs0OxNZwlw6Y-dmI%3Ds10000?fit=max&h=120&w=120&auto=format&s=d21114ca201b6479e28180b672436109"
          },
          {
              "name" : "Art Blocks",
              "price"	: "73.00",
              "contractAdress" : "0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270",
              "tokenImage": "https://lh3.googleusercontent.com/1yWU9TTxsdpsdCGCHlHJ3BIfVgaQXFUZZCLimWSnQPC_SEokZgZGT6SksC5UibBJZrnnvQmr1zVQWFCSb3wL7s_l97wf2zPstC3XNA=w600"
          },
          {
              "name" : "Otherdeed",
              "price"	: "2.12",
              "contractAdress" : "0x34d85c9cdeb23fa97cb08333b511ac86e1c4e258",
              "tokenImage": "https://img-ae.seadn.io/https%3A%2F%2Flh3.googleusercontent.com%2FyIm-M5-BpSDdTEIJRt5D6xphizhIdozXjqSITgK4phWq7MmAU3qE7Nw7POGCiPGyhtJ3ZFP8iJ29TFl-RLcGBWX5qI4-ZcnCPcsY4zI%3Ds10000?fit=max&h=120&w=120&auto=format&s=0fa52b2d635edc28ef61b2b3e3b99a59"
          },
          {
              "name" : "Azuki",
              "price"	: "9.00",
              "contractAdress" : "0xed5af388653567af2f388e6224dc7c4b3241c544",
              "tokenImage": "https://img-ae.seadn.io/https%3A%2F%2Flh3.googleusercontent.com%2FH8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT%3Ds10000?fit=max&h=120&w=120&auto=format&s=7d8fc062f8834bfbce4aec4ff328f996"
          },
          {
              "name" : "CloneX",
              "price"	: "8.55",
              "contractAdress" : "0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b",
              "tokenImage": "https://img-ae.seadn.io/https%3A%2F%2Flh3.googleusercontent.com%2FXN0XuD8Uh3jyRWNtPTFeXJg_ht8m5ofDx6aHklOiy4amhFuWUa0JaR6It49AH8tlnYS386Q0TW_-Lmedn0UET_ko1a3CbJGeu5iHMg%3Ds10000?fit=max&h=120&w=120&auto=format&s=8319b6661311648a1193925c079fb6ef"
          },
          {
              "name" : "VeeFriends",
              "price"	: "6.29",
              "contractAdress": "0xa3aee8bce55beea1951ef834b99f3ac60d1abeeb",
              "tokenImage": "https://lh3.googleusercontent.com/5y-UCAXiNOFXH551w5bWdZEYOCdHPwbqmcKb-xa3uVQEjQgxvih3HtZWSmzqDqd0uk7kIqFrZhw32Gt6xPBFg4t_n9BKhpou-dwnOg=s168"
          },
          {
              "name" : "Moonbirds",
              "price"	: "18.50",
              "contractAdress" : "0x23581767a106ae21c074b2276d25e5c3e136a68b",
              "tokenImage": "https://img-ae.seadn.io/https%3A%2F%2Flh3.googleusercontent.com%2FH-eyNE1MwL5ohL-tCfn_Xa1Sl9M9B4612tLYeUlQubzt4ewhr4huJIR5OLuyO3Z5PpJFSwdm7rq-TikAh7f5eUw338A2cy6HRH75%3Ds10000?fit=max&h=120&w=120&auto=format&s=30f910b04fda1685d06e40aebce47db8"
          },
          {
              "name" : "Meebits",
              "price"	: "3.45",
              "contractAdress" : "0x7bd29408f11d2bfc23c34f18275bbf23bb716bc7",
              "tokenImage": "https://img-ae.seadn.io/https%3A%2F%2Flh3.googleusercontent.com%2Fd784iHHbqQFVH1XYD6HoT4u3y_Fsu_9FZUltWjnOzoYv7qqB5dLUqpGyHBd8Gq3h4mykK5Enj8pxqOUorgD2PfIWcVj9ugvu8l0%3Ds10000?fit=max&h=120&w=120&auto=format&s=bae231b6301817a38ace71bc2b64b81e"
          },
          {
              "name" : "Doodles",
              "price"	: "9.90",
              "contractAdress" : "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e",
              "tokenImage": "https://img-ae.seadn.io/https%3A%2F%2Flh3.googleusercontent.com%2F7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ%3Ds10000?fit=max&h=120&w=120&auto=format&s=65b159799dcff448deaf9106b1ead13e"
          },
          {
              "name" : "Cool Cats",
              "price"	: "3.29",
              "contractAdress" : "0x1a92f7381b9f03921564a437210bb9396471050c",
              "tokenImage": "https://img-ae.seadn.io/https%3A%2F%2Flh3.googleusercontent.com%2FLIov33kogXOK4XZd2ESj29sqm_Hww5JSdO7AFn5wjt8xgnJJ0UpNV9yITqxra3s_LMEW1AnnrgOVB_hDpjJRA1uF4skI5Sdi_9rULi8%3Ds10000?fit=max&h=120&w=120&auto=format&s=2c14b63bf3c552b0a0d2e1caf6367e08"
          },
          {
              "name" : "Bored Ape Kennel Club",
              "price"	: "5.60",
              "contractAdress" : "0xba30e5f9bb24caa003e9f2f0497ad287fdf95623",
              "tokenImage": "https://img-ae.seadn.io/https%3A%2F%2Flh3.googleusercontent.com%2Fl1wZXP2hHFUQ3turU5VQ9PpgVVasyQ79-ChvCgjoU5xKkBA50OGoJqKZeMOR-qLrzqwIfd1HpYmiv23JWm0EZ14owiPYaufqzmj1%3Ds10000?fit=max&h=120&w=120&auto=format&s=9d6e3b7dec9c72aaabf83a13e698cc4a"
          },
          {
              "name" : "Loot",
              "price"	: "0.76",
              "contractAdress" : "0x7b3d36eb606f873a75a6ab68f8c999848b04f935",
              "tokenImage": "https://lh3.googleusercontent.com/g-NFUWjS4IGgym8PHBxyhg5-G_B4x-IHgPKRkxo00JQFE3LOd-95yU2uhrokITVmV7KHEav6OMfAhfJ4roC5hwP-0tI9dMRd9wQLdw=s168"
          },
          {
              "name" : "World Of Women",
              "price"	: "3.12",
              "contractAdress" : "0xe785e82358879f061bc3dcac6f0444462d4b5330",
              "tokenImage": "https://img-ae.seadn.io/https%3A%2F%2Flh3.googleusercontent.com%2FEFAQpIktMBU5SU0TqSdPWZ4byHr3hFirL_mATsR8KWhM5z-GJljX8E73V933lkyKgv2SAFlfRRjGsWvWbQQmJAwu3F2FDXVa1C9F%3Ds10000?fit=max&h=120&w=120&auto=format&s=9c69a63a4c795e42d84e0a70f026847b"
          },
          {
              "name" : "Cryptoadz",
              "price"	: "1.68",
              "contractAdress": "0x1cb1a5e65610aeff2551a50f76a87a7d3fb649c6",
              "tokenImage": "https://img-ae.seadn.io/https%3A%2F%2Flh3.googleusercontent.com%2FiofetZEyiEIGcNyJKpbOafb_efJyeo7QOYnTog8qcQJhqoBU-Vu9l3lXidZhXOAdu6dj4fzWW6BZDU5vLseC-K03rMMu-_j2LvwcbHo%3Ds10000?fit=max&h=120&w=120&auto=format&s=ff2900e7a1682f22ab0e57992b0223bf"
          }
        ];
        const erc20Images = 
        [
          {
            "contractAddress": "",
            "tokenSymbol": "ETH",
            "tokenImage": "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
          },
          {
            "contractAddress": "0x6b175474e89094c44da98b954eedeac495271d0f",
            "tokenSymbol": "DAI",
            "tokenImage": "https://s2.coinmarketcap.com/static/img/coins/64x64/4943.png"
          },
          {
            "contractAddress": "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce",
            "tokenSymbol": "SHIB",
            "tokenImage": "https://s2.coinmarketcap.com/static/img/coins/64x64/5994.png"
          },
          {
            "contractAddress": "0x3845badAde8e6dFF049820680d1F14bD3903a5d0",
            "tokenSymbol": "SAND",
            "tokenImage": "https://s2.coinmarketcap.com/static/img/coins/64x64/6210.png"
          },
          {
            "contractAddress": "0xf629cbd94d3791c9250152bd8dfbdf380e2a3b9c",
            "tokenSymbol": "ENJ",
            "tokenImage": "https://s2.coinmarketcap.com/static/img/coins/64x64/2130.png"
          },
          {
            "contractAddress": "0x3a4f40631a4f906c2BaD353Ed06De7A5D3fCb430",
            "tokenSymbol": "PLA",
            "tokenImage": "https://s2.coinmarketcap.com/static/img/coins/64x64/7461.png"
          },
          {
            "contractAddress": "0x3a4f40631a4f906c2BaD353Ed06De7A5D3fCb430",
            "tokenSymbol": "PLA",
            "tokenImage": "https://s2.coinmarketcap.com/static/img/coins/64x64/7461.png"
          },
          {
            "contractAddress": "0xdac17f958d2ee523a2206206994597c13d831ec7",
            "tokenSymbol": "USDT",
            "tokenImage": "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
          },
          {
            "contractAddress": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            "tokenSymbol": "USDC",
            "tokenImage": "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
          },
          {
            "contractAddress": "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
            "tokenSymbol": "WBTC",
            "tokenImage": "https://s2.coinmarketcap.com/static/img/coins/64x64/3717.png"
          },
          {
            "contractAddress": "0x50d1c9771902476076ecfc8b2a83ad6b9355a4c9",
            "tokenSymbol": "FTT",
            "tokenImage": "https://s2.coinmarketcap.com/static/img/coins/64x64/4195.png"
          },
          {
            "contractAddress": "0xa0b73e1ff0b80914ab6fe0444e65848c4c34450b",
            "tokenSymbol": "CRO",
            "tokenImage": "https://s2.coinmarketcap.com/static/img/coins/64x64/3635.png"
          },
          {
            "contractAddress": "0x514910771af9ca656af840dff83e8264ecf986ca",
            "tokenSymbol": "LINK",
            "tokenImage": "https://s2.coinmarketcap.com/static/img/coins/64x64/1975.png"
          },
          {
            "contractAddress": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
            "tokenSymbol": "UNI",
            "tokenImage": "https://s2.coinmarketcap.com/static/img/coins/64x64/7083.png"
          },
          {
            "contractAddress": "0x5c147e74D63B1D31AA3Fd78Eb229B65161983B2b",
            "tokenSymbol": "FLOW",
            "tokenImage": "https://s2.coinmarketcap.com/static/img/coins/64x64/4558.png"
          },
          {
            "contractAddress": "0x0f5d2fb29fb7d3cfee444a200298f468908cc942",
            "tokenSymbol": "MANA",
            "tokenImage": "https://s2.coinmarketcap.com/static/img/coins/64x64/1966.png"
          },
          {
            "contractAddress": "0xdb0acc14396d108b3c5574483acb817855c9dc8d",
            "tokenSymbol": "EMB",
            "tokenImage": "https://s2.coinmarketcap.com/static/img/coins/64x64/9626.png"
          },
          {
            "contractAddress": "0xdb0acc14396d108b3c5574483acb817855c9dc8d",
            "tokenSymbol": "EMB",
            "tokenImage": "https://s2.coinmarketcap.com/static/img/coins/64x64/9626.png"
          },
          {
            "contractAddress": "0x61107a409fffe1965126aa456af679719695c69c",
            "tokenSymbol": "UMI",
            "tokenImage": "https://s2.coinmarketcap.com/static/img/coins/64x64/12737.png"
          },
          {
            "contractAddress": "0xc18360217d8f7ab5e7c516566761ea12ce7f9d72",
            "tokenSymbol": "ENS",
            "tokenImage": "https://s2.coinmarketcap.com/static/img/coins/64x64/13855.png"
          },
          {
            "contractAddress": "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
            "tokenSymbol": "MATIC",
            "tokenImage": "https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png"
          },
          {
            "contractAddress": "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
            "tokenSymbol": "MATIC",
            "tokenImage": "https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png"
          },
          {
            "contractAddress": "0x4d224452801aced8b2f0aebe155379bb5d594381",
            "tokenSymbol": "APE",
            "tokenImage": "https://s2.coinmarketcap.com/static/img/coins/64x64/18876.png"
          },
          {
            "contractAddress": "0x4d224452801aced8b2f0aebe155379bb5d594381",
            "tokenSymbol": "APE",
            "tokenImage": "https://s2.coinmarketcap.com/static/img/coins/64x64/18876.png"
          },
          {
            "contractAddress": "0x407a3e019c655b779ccd098ff50377e4c5f1c334",
            "tokenSymbol": "OTHR",
            "tokenImage": "https://s2.coinmarketcap.com/static/img/coins/64x64/20454.png"
          },
          {
            "contractAddress": "0xa2cd3d43c775978a96bdbf12d733d5a1ed94fb18",
            "tokenSymbol": "XCN",
            "tokenImage": "https://s2.coinmarketcap.com/static/img/coins/64x64/18679.png"
          },
          {
            "contractAddress": "0xbbbbca6a901c926f240b89eacb641d8aec7aeafd",
            "tokenSymbol": "LRC",
            "tokenImage": "https://s2.coinmarketcap.com/static/img/coins/64x64/1934.png"
          },
          {
            "contractAddress": "0xc944e90c64b2c07662a292be6244bdf05cda44a7",
            "tokenSymbol": "GRT",
            "tokenImage": "https://s2.coinmarketcap.com/static/img/coins/64x64/6719.png"
          },
          {
            "contractAddress": "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9",
            "tokenSymbol": "AAVE",
            "tokenImage": "https://s2.coinmarketcap.com/static/img/coins/64x64/7278.png"
          }
        ];

        if(this.state.data !== null){
          const jayZwalletAddress = '0x3b417faee9d2ff636701100891dc2755b5321cc3';
          const transactions = [];
          
          this.state.data.forEach(element=> {
            let result;
            nftprices.forEach(prices => {
              if(element.contractAddress === prices.contractAdress) return result = element
            });
            if(result) return transactions.push(result);
            //return result;
          });
          
          this.state.data.forEach(transaction => {
            let result;
            erc20Images.forEach(erc20 => {
              if(transaction.contractAddress === erc20.contractAdress) return result = transaction
            });
            if(result) return transactions.push(result);
            //return result;
          });


          console.log('filtered transactions-->',this.state.data)
          sample = this.state.data.map(transactions => {
            const date = new Date(transactions.timeStamp * 1000).toLocaleDateString('en-US');
            const time = new Date(transactions.timeStamp * 1000).toLocaleTimeString('en-US');
            if(transactions.contractAddress === "" && transactions.to === jayZwalletAddress) {
                return(
                <div className='transactions_row'>
                <p>{`${date} ${time}`}</p>
                <p>ETH</p>
                <p>Buy</p>
                </div>
                )
            }
            else if(transactions.contractAddress === "" && transactions.from === jayZwalletAddress) {
             return( <div className="transactions_row">
              <p>{`${date} ${time}`}</p>
              <p>ETH</p>
              <p>Sell</p>
              </div>
             )
          }
          
          else if (transactions.to === jayZwalletAddress) {
            return(
              <div className='transactions_row'>
              <p>{`${date} ${time}`}</p>
              <p>{transactions.tokenName}</p>
              <p>Buy</p>
              </div>
              )
          }

          else if (transactions.from === jayZwalletAddress) {
            return(
              <div className='transactions_row'>
              <p>{`${date} ${time}`}</p>
              <p>{transactions.tokenName}</p>
              <p>Sell</p>
              </div>
              )
          }



           return (
            <div>

           <p>{transactions.timeStamp}</p>
           </div>)
          })
          console.log(sample)
        }
        return (
            <div id="transactionsContainer">
                <h3>Transactions</h3>
                <div id='tableHeadingsWrapper'>
                    <h5 className="tableHeading">Date</h5>
                    <h5 className="tableHeading">Name of Token</h5>
                    <h5 className="tableHeading">Buy/Sell</h5>
                    {/* <h5 className="tableHeading">City</h5> */}
                </div>
                <div>
                    {sample}
                </div>
            </div>
        );
    }
}
/*
"database/getTransactions/:address"
filter for the top coins from the NFT JSON file
//BUY OR SELL
//NAME OF THE NFT OR TOKEN
//DATE
//IF
//ele.timeStamp
//ele.to BUY
//ele.from

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

export default Transactions;