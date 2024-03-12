
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
var proxy = {
  host: '117.92.236.223',
  port: 23166
};
const fs = require('fs').promises;
const path = require('path');
var parameter = require("../../parameter.json");
const { Connection, PublicKey, Keypair, Transaction, sendAndConfirmTransaction } = require('@solana/web3.js');
const bs58 = require('bs58');

  async function init(){
  
    var bool = await getCode(parameter.address);
    while(!bool){
     bool = await getCode(parameter.address);
    }
    


    for(var i = 0;i<99999999;i++){
      var data =  await fs.readFile('./code.txt',"utf8");
      var list = data.split("\n");
      if(list[0]){
      var result =   await main(list[0]);
      if(result.isSuccess){
        list.shift();
        data = list.join("\n");
        await fs.writeFile('./code.txt', data, "utf8");
       var bool = await getCode(result.addr);
       while(!bool){
        bool = await getCode(result.addr);
       }
      }
      }
      
    }

    }

    async function main(code){
      const tokenAccount = Keypair.generate();
      const secretKeyString = bs58.encode(tokenAccount.secretKey);
      var addr = tokenAccount.publicKey.toString();

      // var data1 =  await getIp();
      // if(!data1.isSuccess){
      //   return {
      //     isSuccess:false,
      //     addr:addr
      //   };
      // }
      // var ipq = data1.newIp[0];
      // var   proxy1 = {
      //   host: ipq[0],
      //   port: ipq[1]
      //   }
      // var bool =  await claim(addr,code,proxy1);
      var bool =  await claim1(addr,code);
      if(bool){
        await fs.appendFile('./solAccount.txt',addr+"----"+secretKeyString+"\n");
        return {
          isSuccess:true,
          addr:addr
        };
      }else{
        return {
          isSuccess:false,
          addr:addr
        };
      }

      // await claim(addr,"ZTYRN");
    }

    async function getCode(adr){
     
  try {
    var data = await axios.get("https://gg.zip/api/invites/"+adr);
     console.log("data",data.data);
     if(data.data){
      var list = [];
      for(var i = 0;i<data.data.length;i++){
        list.push(data.data[i].code);
      }
      data = list.join("\n");
      await fs.appendFile('./code.txt',data+"\n");
      return true;
     }else{
    return false;
    }
     
  } catch (error) {
    console.log(error);
    return false;
  }

  }

    function generateRandomString(length) {
      // 定义可能的字符集
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = ''; // 初始化结果字符串
      const charactersLength = characters.length; // 获取字符集长度
    
      // 循环生成每个字符
      for (let i = 0; i < length; i++) {
        // 从字符集中随机选择一个字符，并添加到结果字符串
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
    
      return result;
    }

    function getRandomInt(min, max) {
      // 确保min和max是整数
      min = Math.ceil(min);
      max = Math.floor(max);
      
      // 生成介于min（包含）和max（不包含）之间的随机整数
      // 要包含max，可以在结果上加1
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generateRandomSixDigitNumber() {
      // 生成一个介于100000（包含）和999999（包含）之间的随机数
      const min = 100000;
      const max = 999999;
      const number = Math.floor(Math.random() * (max - min + 1)) + min;
      
      // 转换成字符串
      return number.toString();
    }

    async function claim1(adr,code){
      var name = generateRandomString(getRandomInt(7,12));
      const datas = {
        code: code,
        username:name,
        image:"https://gg.zip/assets/graphics/koji.png",
        twitterId:generateRandomSixDigitNumber(),
        wallet:adr
      };
   
      const headers = {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.9,qu;q=0.8',
        'Baggage': 'sentry-environment=vercel-production,sentry-release=fae50a9d7b29ece72a76cf2357efdc674aa97013,sentry-public_key=00213ba1803efc1df58cc0d6afe8ccab,sentry-trace_id=8fc863ff6baa46d982a86d8e1356ca83',
        'Cookie': '__Host-next-auth.csrf-token=82221a8e60afda99435998bacc9b7e14bd7d4f9387b6b91637ca61ed3f38b9b1%7Cf1d29aaaf35f405587131837eadf239cc477413671b1a0463b70bb7359c67ca7; __Secure-next-auth.callback-url=https%3A%2F%2Fgg.zip',
        'Referer': 'https://gg.zip/claimdrop',
        'Sec-Ch-Ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"macOS"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'Sentry-Trace': '8fc863ff6baa46d982a86d8e1356ca83-9ce56415d5c6e946-1',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
      };
  try {
    var data = await axios.post("https://gg.zip/api/claim",datas,{headers,timeout:10000});
     console.log("data",data.data);
     if(data.data&&data.data.includes("true")){
      return true;
     }else{
      return false;
     }
  } catch (error) {
    console.log(error);
    return false;
  }

  }
    async function claim(adr,code,proxy){
        var name = generateRandomString(getRandomInt(7,12));
        const datas = {
          code: code,
          username:name,
          image:"https://gg.zip/assets/graphics/koji.png",
          twitterId:generateRandomSixDigitNumber(),
          wallet:adr
        };
     
        const headers = {
          'Accept': '*/*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'zh-CN,zh;q=0.9,qu;q=0.8',
          'Baggage': 'sentry-environment=vercel-production,sentry-release=fae50a9d7b29ece72a76cf2357efdc674aa97013,sentry-public_key=00213ba1803efc1df58cc0d6afe8ccab,sentry-trace_id=8fc863ff6baa46d982a86d8e1356ca83',
          'Cookie': '__Host-next-auth.csrf-token=82221a8e60afda99435998bacc9b7e14bd7d4f9387b6b91637ca61ed3f38b9b1%7Cf1d29aaaf35f405587131837eadf239cc477413671b1a0463b70bb7359c67ca7; __Secure-next-auth.callback-url=https%3A%2F%2Fgg.zip',
          'Referer': 'https://gg.zip/claimdrop',
          'Sec-Ch-Ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
          'Sec-Ch-Ua-Mobile': '?0',
          'Sec-Ch-Ua-Platform': '"macOS"',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          'Sentry-Trace': '8fc863ff6baa46d982a86d8e1356ca83-9ce56415d5c6e946-1',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
        };
    try {
      var data = await axios.post("https://gg.zip/api/claim",datas,{headers,proxy,timeout:10000});
       console.log("data",data.data);
       if(data.data&&data.data.includes("true")){
        return true;
       }else{
        return false;
       }
    } catch (error) {
    //  console.log(error);
      return false;
    }

    }
  
    async function getIp(){
      try {
        var ip = await axios.get("http://api.haiwaidaili.net/abroad?token=0319a88a58487249ca94520e4131867e&num="+1+"&format=2&protocol=http&country=&state=&city=&sep=1&csep=&type=datacenter");
      //  console.log(ip);
        var newIp = ip.data.data;
        // console.log(newIp);
      } catch (error) {
        return {
          isSuccess:false
        }
      }
     
      if(newIp){
        return {
          isSuccess:true,
           newIp:newIp
        }
      }else{
        return {
          isSuccess:false
        }
      }
      // console.log(ip);
    // var   proxy1 = {
    //   host: newIp[0],
    //   port: newIp[1]
    //   }
    //   console.log(proxy1);
    //   proxy = proxy1;
      
    }

     

module.exports = {
  init
  };