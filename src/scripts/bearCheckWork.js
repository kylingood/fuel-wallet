
const sodium = require('sodium-native');
const {
  isMainThread,
  parentPort,
  workerData,
  threadId,
  MessageChannel,
  MessagePort,
  Worker
} = require('worker_threads');
var axios = require('axios-https-proxy-fix');
const { base64 } = require('ethers/lib/utils');
const fs = require('fs').promises;
var walletWithProvider;
var provider;
var abiToken = require("./abi/token.json");
var abiNft = require("./abi/nft.json");
const { BigNumber, Contract, ethers, Wallet, providers, utils } = require("ethers");
(async function  init(){
  
  function initWallet(privateKey){
    var url = "https://artio.rpc.berachain.com";
     provider = new providers.JsonRpcProvider(url);
    var walletProvider = new Wallet(privateKey, provider);
    walletWithProvider = walletProvider;
  }


  async function main(addr,key){
    initWallet(key);
    try {
      var balance = await walletWithProvider.getBalance();
      //  console.log("bear",!balance.gte(ethers.utils.parseUnits("0.11","ether")))
         if(!balance.gte(ethers.utils.parseUnits("0.11","ether"))){
           console.log(addr,":","No bear");
           await fs.appendFile('./checkBearFail.txt',addr+"\n");
         }
    } catch (error) {
      console.log(addr,":","No bear");
      await fs.appendFile('./checkBearFail.txt',addr+"\n");
    }
   
   
 
  }
  
    
    async function init(){
      var listKey = workerData.keys;
      var listAddr = workerData.adrs;
      // console.log(listKey);
      for(var i = 0;i<listKey.length;i++){
        if(listKey[i]){
         // console.log(listAddr[i]);
          await main(listAddr[i],listKey[i]);
        }
        
      }
      process.exit(0);

    }
    await init();
})();