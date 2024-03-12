import { Wallet } from "fuels";
import fs from 'fs';
import readline from 'readline';

async function add_address(address, bech32Address) {
    const address_filename = './address.txt';
    const address_line = address + "----" + bech32Address + "\n";

    try {
        await fs.promises.appendFile(address_filename, address_line, { encoding: 'utf-8' });
        console.log('Address added:', address_line);
    } catch (error) {
        console.error('Error adding address:', error);
    }
}


try {

    const filename = './code.txt';
    const delimiter = '----';
    const data = await fs.promises.readFile(filename, 'utf8');

    const lines = data.split('\n');
    const result = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        const parts = line.split(delimiter);
        const PRIVATE_KEY = parts[1];
        const address = parts[0];
        const walletData = Wallet.fromPrivateKey(PRIVATE_KEY);
        const bech32Address = walletData.address.bech32Address;
        console.log(bech32Address);
        await add_address(address, bech32Address);
    }

} catch (error) {
    console.log(error);
   
}

// // Random Wallet
// console.log(Wallet.generate());

//const PRIVATE_KEY = 'dfdfd'
// Using privateKey Wallet
//console.log(Wallet.fromPrivateKey(PRIVATE_KEY));

//


// if(walletData.isSuccess){
   
//     await fs.writeFile('./address.txt', data, "utf8");
//    var bool = await getCode(result.addr);
//    while(!bool){
//     bool = await getCode(result.addr);
//    }
// }