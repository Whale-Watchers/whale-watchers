const axios = require('axios');
const cheerio = require('cheerio');

const erc721Scraper = {}

erc721Scraper.imageScraper = async (contractAddress, tokenID) => {

  await axios(`https://looksrare.org/collections/${contractAddress}/${tokenID}`)
    .then(response => {
      const htmlData = response.data;
      // console.log('htmlData', htmlData);
      const $ = cheerio.load(htmlData);

      const tokenImage = $('.css-11c5cw0').children('span').children('img').attr('src');
      // console.log('tokenImage', tokenImage)
      return tokenImage
    })
    .catch(err => console.log(err, 'Error in openseaImageScrape function'));
}

erc721Scraper.floorPriceScraper = async (contractAddress) => {

}

module.exports = erc721Scraper;
// https://opensea.io/assets/ethereum/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb/6095