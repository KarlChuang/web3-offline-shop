const { ethers } = require('ethers');
const { abi: contractABI } = require('../../contract/config/DrinkNFT.json');
const { DrinkNFT } = require('../../contract/config/contract-address.json');

const network = 'http://localhost:8545';
const provider = ethers.getDefaultProvider(network);
// const provider = new ethers.providers.JsonRpcProvider(network);

// Define contract on global variable
async function contractEventHandler() {
  const drinkContract = new ethers.Contract(DrinkNFT, contractABI, provider);

  drinkContract.on('Mint', (from, id) => {
    console.log('Print');
    console.log(from, id);
    console.log('Listenrer');
    const arr = drinkContract.listeners('Mint');
    console.log(arr);
  });
}

export default contractEventHandler;
