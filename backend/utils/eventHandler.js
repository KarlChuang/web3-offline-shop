require('dotenv').config();

const { ethers } = require('ethers');
const db = require('../models');

const network = process.env.NETWORK_URL;
const provider = ethers.getDefaultProvider(network);
// const provider = new ethers.providers.JsonRpcProvider(network);
const topic = ethers.utils.id('Burn(address,uint256)');
const filter = {
  topics: [topic],
};

// Define contract on global variable
async function contractEventHandler() {
  // const drinkContract = new ethers.Contract(DrinkNFT, contractABI, provider);

  // TODO: modify contract to provider
  provider.on(filter, async (result) => {
    console.log(result);
    const contractAddress = result.address;
    const [, rawSender, rawTokenId] = result.topics;
    // TODO: Check sender
    console.log(rawSender);
    // const sender = Number(rawSender).toString(16);
    const tokenId = Number(rawTokenId);
    try {
      const signature = db.Signature.findOne({
        where: {
          contractAddress,
          tokenId,
        },
      });
      await signature.destroy();
    } catch (err) {
      console.log(err);
    }
  });
}

module.exports = contractEventHandler;
