const { RequestHandler } = require("express");
const fs = require("fs");
const path = require("path");
const erc721ImageScraper = require('../scrapers/erc721ImageScraper.js')

const scrapingController = {};

scrapingController.getErc721Image = async (req, res, next) => {
  const { contractAddress, tokenID } = req.params;
  
  res.locals.erc721Image = await erc721ImageScraper(contractAddress, tokenID);
  return next()
}

module.exports = scrapingController;