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
    timeStampArray.push(`${time} ${date}`);
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

module.exports = etherscanController;