const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const erc721ImageScraper = require('../scrapers/erc721ImageScraper');

const looksRareController = {};

looksRareController.getTokenImage = async (req, res, next) => {
    
  const walletTransactions = res.locals.walletTransactions;

  for (const transaction of walletTransactions) {
    if (transaction.contractAddress === '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb') {
      // const imageURI = await erc721ImageScraper.imageScraper(transaction.contractAddress, tran);
      transaction.imageURI = "https://img.seadn.io/files/8f9108cbbae163f656406ef5826b47d4.png?fit=max&auto=format";
  }
    else if (transaction.hasOwnProperty('tokenID')) {

      const url = `https://api.looksrare.org/api/v1/tokens?collection=${transaction.contractAddress}&tokenId=${transaction.tokenID}`
      
      await fetch(url)
        .then(data => data.json())
        .then(response => {
        transaction.imageURI = response.data.imageURI;
        })
        .catch(error => next({
          log: `error in looksRareController.getTokenImage when fetching imageURI for erc721`,
          message: `error in looksRareController.getTokenImage when fetching imageURI for erc721 ${error}`
        }))
    }
  }

  return next();
}

module.exports = looksRareController;


/* {
    "success": true,
    "message": null,
    "data": {
        "id": 18942106,
        "collectionAddress": "0x85f740958906b317de6ed79663012859067E745B",
        "tokenId": "411",
        "tokenURI": "https://raw.githubusercontent.com/recklesslabs/wickedcraniums/main/411",
        "isExplicit": false,
        "isAnimated": false,
        "flag": "TRIAGE",
        "name": "Wicked Cranium #411",
        "description": null,
        "attributes": [
            {
                "traitType": "Background",
                "value": "TheWicked",
                "displayType": "string",
                "count": "1022",
                "floorOrder": {
                    "hash": "0x4886f4395a05ae8f0a1d0f93f2d46d9263b1b9a86030a0f23e6ef56fc7b8e5e5",
                    "collectionAddress": "0x85f740958906b317de6ed79663012859067E745B",
                    "tokenId": "8001",
                    "isOrderAsk": true,
                    "signer": "0xd5a9C4a92dDE274e126f82b215Fccb511147Cd8e",
                    "strategy": "0x56244Bb70CbD3EA9Dc8007399F61dFC065190031",
                    "currencyAddress": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
                    "amount": 1,
                    "price": "398000000000000000",
                    "nonce": "5378",
                    "startTime": 1654074513,
                    "endTime": 1669626513,
                    "minPercentageToAsk": 8500,
                    "params": "",
                    "status": "VALID",
                    "signature": "0xb016f57fbd979cc2a329bc4bd1e5016cb45df5d180b549ea6f207a352a1cddd52a8d3afb3727cab442df939244064b9a0a38eda982c8b1dc7168c8e627276cb41b",
                    "v": 27,
                    "r": "0xb016f57fbd979cc2a329bc4bd1e5016cb45df5d180b549ea6f207a352a1cddd5",
                    "s": "0x2a8d3afb3727cab442df939244064b9a0a38eda982c8b1dc7168c8e627276cb4"
                }
            },
            {
                "traitType": "Body",
                "value": "AquaHazeO",
                "displayType": "string",
                "count": "214",
                "floorOrder": {
                    "hash": "0xbcf9070053679ac669bcb9f5b60c6ef733abe02f12accbb5bb184c121c49c70f",
                    "collectionAddress": "0x85f740958906b317de6ed79663012859067E745B",
                    "tokenId": "8017",
                    "isOrderAsk": true,
                    "signer": "0xd5a9C4a92dDE274e126f82b215Fccb511147Cd8e",
                    "strategy": "0x56244Bb70CbD3EA9Dc8007399F61dFC065190031",
                    "currencyAddress": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
                    "amount": 1,
                    "price": "398000000000000000",
                    "nonce": "5354",
                    "startTime": 1654074277,
                    "endTime": 1669626277,
                    "minPercentageToAsk": 8500,
                    "params": "",
                    "status": "VALID",
                    "signature": "0x5ade7946685b528539ca4cc86d8a180d42cd73f1082e829ae27a1d09d659b923253c024d9fdcc1313b2ab6d545c632b10552652210463f589cba934da85e8c001c",
                    "v": 28,
                    "r": "0x5ade7946685b528539ca4cc86d8a180d42cd73f1082e829ae27a1d09d659b923",
                    "s": "0x253c024d9fdcc1313b2ab6d545c632b10552652210463f589cba934da85e8c00"
                }
            },
            {
                "traitType": "Clothes",
                "value": "SpiderShirt",
                "displayType": "string",
                "count": "263",
                "floorOrder": {
                    "hash": "0xa55fe41edf115d6a92439aa9863a4b52a0e1f3391196418a06c63f7e8cd68116",
                    "collectionAddress": "0x85f740958906b317de6ed79663012859067E745B",
                    "tokenId": "8988",
                    "isOrderAsk": true,
                    "signer": "0xd5a9C4a92dDE274e126f82b215Fccb511147Cd8e",
                    "strategy": "0x56244Bb70CbD3EA9Dc8007399F61dFC065190031",
                    "currencyAddress": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
                    "amount": 1,
                    "price": "398000000000000000",
                    "nonce": "5370",
                    "startTime": 1654074435,
                    "endTime": 1669626434,
                    "minPercentageToAsk": 8500,
                    "params": "",
                    "status": "VALID",
                    "signature": "0xdb49817bec85b7efc0be42edd5052bfc8fd3b06ac12c861eb9e8fb1214b3dae71b47e96ed5157141f39d3efcf17807c2afe58b6ec96ab8ffc306d2430a6936cd1c",
                    "v": 28,
                    "r": "0xdb49817bec85b7efc0be42edd5052bfc8fd3b06ac12c861eb9e8fb1214b3dae7",
                    "s": "0x1b47e96ed5157141f39d3efcf17807c2afe58b6ec96ab8ffc306d2430a6936cd"
                }
            },
            {
                "traitType": "Eyes",
                "value": "Bloodshot",
                "displayType": "string",
                "count": "370",
                "floorOrder": {
                    "hash": "0x9e93e5276b0dfe7b6f79cb7265325fb896899b08e4c88aa9b4173d93e11762f0",
                    "collectionAddress": "0x85f740958906b317de6ed79663012859067E745B",
                    "tokenId": "8149",
                    "isOrderAsk": true,
                    "signer": "0xd5a9C4a92dDE274e126f82b215Fccb511147Cd8e",
                    "strategy": "0x56244Bb70CbD3EA9Dc8007399F61dFC065190031",
                    "currencyAddress": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
                    "amount": 1,
                    "price": "398000000000000000",
                    "nonce": "5353",
                    "startTime": 1654074268,
                    "endTime": 1669626267,
                    "minPercentageToAsk": 8500,
                    "params": "",
                    "status": "VALID",
                    "signature": "0x880af42ae3b4c0fa8b4adf5068e809a0bf727fddf0a4839c43f17971cb7667b37f63041e720b10a704e4e7d5e2d603655bdb0cd87d84d2ae16894de6e61d6cb01b",
                    "v": 27,
                    "r": "0x880af42ae3b4c0fa8b4adf5068e809a0bf727fddf0a4839c43f17971cb7667b3",
                    "s": "0x7f63041e720b10a704e4e7d5e2d603655bdb0cd87d84d2ae16894de6e61d6cb0"
                }
            },
            {
                "traitType": "Head",
                "value": "Bun",
                "displayType": "string",
                "count": "231",
                "floorOrder": {
                    "hash": "0x03ea6c5fe12348c5f3b01183ff6d426b66d2fa2a98716b9ab8177afe327aae6c",
                    "collectionAddress": "0x85f740958906b317de6ed79663012859067E745B",
                    "tokenId": "2058",
                    "isOrderAsk": true,
                    "signer": "0xd5a9C4a92dDE274e126f82b215Fccb511147Cd8e",
                    "strategy": "0x56244Bb70CbD3EA9Dc8007399F61dFC065190031",
                    "currencyAddress": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
                    "amount": 1,
                    "price": "398000000000000000",
                    "nonce": "5380",
                    "startTime": 1654074533,
                    "endTime": 1669626532,
                    "minPercentageToAsk": 8500,
                    "params": "",
                    "status": "VALID",
                    "signature": "0xac7e9bcfcb22339a98a65749013b1ee8159daa0e524c05510b156ff1d735151604d0668ef36f9d48a318272109cf7f693e180ae031fa01b396081f7c18194e601b",
                    "v": 27,
                    "r": "0xac7e9bcfcb22339a98a65749013b1ee8159daa0e524c05510b156ff1d7351516",
                    "s": "0x04d0668ef36f9d48a318272109cf7f693e180ae031fa01b396081f7c18194e60"
                }
            },
            {
                "traitType": "Mouth",
                "value": "Wicked",
                "displayType": "string",
                "count": "1181",
                "floorOrder": {
                    "hash": "0x1021f5987f7b7b40148facdcebcd9edd729f79fb066d3f0044a79513f7401c94",
                    "collectionAddress": "0x85f740958906b317de6ed79663012859067E745B",
                    "tokenId": "9165",
                    "isOrderAsk": true,
                    "signer": "0xd5a9C4a92dDE274e126f82b215Fccb511147Cd8e",
                    "strategy": "0x56244Bb70CbD3EA9Dc8007399F61dFC065190031",
                    "currencyAddress": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
                    "amount": 1,
                    "price": "398000000000000000",
                    "nonce": "5366",
                    "startTime": 1654074395,
                    "endTime": 1669626395,
                    "minPercentageToAsk": 8500,
                    "params": "",
                    "status": "VALID",
                    "signature": "0xcd69bff0b6a81e5a14414adec657648a02e8746b57d1c6985bbe8cadde7ebb1972ac2c9056b1d69dea4ef151626403e1fd78afca61a6d0c9ebfbe8faebddba181b",
                    "v": 27,
                    "r": "0xcd69bff0b6a81e5a14414adec657648a02e8746b57d1c6985bbe8cadde7ebb19",
                    "s": "0x72ac2c9056b1d6        ],9dea4ef151626403e1fd78afca61a6d0c9ebfbe8faebddba18"
                }
            }
        ],
        "collection": {
            "address": "0x85f740958906b317de6ed79663012859067E745B",
            "owner": "0xa343F89E7A90Ce6eB8888A4247820697DBE05623",
            "name": "The Wicked Craniums",
            "description": null,
            "symbol": "TWC",
            "type": "ERC721",
            "websiteLink": "https://twitter.com/wickedcraniums",
            "facebookLink": null,
            "twitterLink": null,
            "instagramLink": null,
            "telegramLink": null,
            "mediumLink": "https://wickedcranium.com/",
            "discordLink": "https://discord.gg/yBYAdy8fqX",
            "isVerified": true,
            "isExplicit": false
        },
        "imageURI": "https://looksrare.mo.cloudinary.net/0x85f740958906b317de6ed79663012859067E745B/411?resource_type=image&f=auto& */






// https://api.looksrare.org/api/v1/tokens?collection=0x85f740958906b317de6ed79663012859067e745b&tokenId=411