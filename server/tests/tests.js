const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const fs = require("fs");
const path = require("path");
const databaseController = require("../controllers/databaseController");

  const whaleAddresses = {
    "0x3b417faee9d2ff636701100891dc2755b5321cc3": "Jay-Z",
    "0x7217bc604476859303a27f111b187526231a300c": "Mike Tyson",
    // "0xd2aff66959ee0e6f92ee02d741071ddb5084bebb": "Blau",
    // "0x3becf83939f34311b6bee143197872d877501b11": "Stephen Curry",
    // "0xe4bbcbff51e61d0d95fcc5016609ac8354b177c4": "Steve Aoki",
    "0xc1064e3662b0718357e9050694a3bfeaabede8ab": "LaMello Ball",
    // "0x3781d92e5449b5b689fee308ded44882085b6312": "Lindsay Lohan",
    // "0xa679c6154b8d4619af9f83f0bf9a13a680e01ecf": "Mark Cuban",
    "0xc6b0562605d35ee710138402b878ffe6f2e23807": "Beeple",
    "0xce90a7949bb78892f159f428d0dc23a8e3584d75": "Snoop Dog",
    "0x8d3bc45d7b30013c37c141f6ce7c981b2613efaa": "JaRule",
    "0x0864224f3cc570ab909ebf619f7583ef4a50b826": "Serena Williams",
    "0x0ed1e02164a2a9fad7a9f9b5b9e71694c3fad7f2": "Alexis Ohanian",
    "0xb55eb9bd32d6ab75d7555192e7a3a7ca0bcd5738": "Mike Shinoda",
    "0x3c6aeff92b4b35c2e1b196b57d0f8ffb56884a17": "Shaquille O'Neal",
    "0xf6de94be96f80602d90bf29bd9e88a0e843b2eb9": "Elijah Wood",
    "0x9114b66e4bd387eb832d1477e86ede0cf7f76115": "Seth Curry",
    "0x35cded880959f93c415723902f91f964367a4dcd": "Joel Madden",
    "0x7948aa99e095dbfc1971bc8d2d1173893146630e": "Reese Witherspoon",
    "0xdbf2445e5049c04cda797dae60ac885e7d79df9d": "Jordan Belfort",
    "0xa0eaf6b0df87132c9a28e450a43c1d906defb60b": "DJ Marshmello",
    "0x4b1bdae6b46c2ed904581d7e4bf2b71e5f3f7072": "Timbaland",
    "0xc86b12d850fdbbf3260a7baae862f85857aadbba": "Lil Baby",
    "0x0394451c1238cec1e825229e692aa9e428c107d8": "Jimmy Fallon",
    "0xbea020c3bd417f30de4d6bd05b0ed310ac586cc0": "Post Malone",
    "0xff0bd4aa3496739d5667adc10e2b843dfab5712b": "Logan Paul",
    "0xd6a984153acb6c9e2d788f08c2465a1358bb89a7": "Gary Vee",
    "0xb6aa5a1aa37a4195725cdf1576dc741d359b56bd": "Paris Hilton",
    "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d": "Neymar",
    "0xbbdac7ba85af15420afd1f4aa3313c3535b15cde": "Kevin Hart",
    "0x31185f782a7c11044566d70dfcf1c8175486f451": "Gwyneth Paltrow",
    "0xaa1b056286a66a9e6752c26776ac034c662a51d5": "Eva Longoria",
    "0x58473e9ac681c4424ca74619281ff71801d002d6": "Dillon Francis",
    "0x6ef962ea7e64e771d3a81bce4f95328d76d7672b": "Madonna",
  };

  Object.keys(whaleAddresses).forEach(whaleAddress => {
    fetch(`http://localhost:3000/database/getHoldings/${whaleAddress}`)
      .then(data => data.json())
      .then(data => {
        console.log('whaleAddress', whaleAddress);
        console.log('ETH value', data.eth.value);
      })
  });