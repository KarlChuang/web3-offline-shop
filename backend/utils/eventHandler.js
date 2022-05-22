require('dotenv').config();

const { ethers } = require('ethers');
const db = require('../models');
const { provider } = require('../config');

const topic = ethers.utils.id('Burn(address,uint256)');
const filter = {
  topics: [topic],
};

// Define contract on global variable
async function contractEventHandler() {
  // const drinkContract = new ethers.Contract(DrinkNFT, contractABI, provider);

  provider.on(filter, async (result) => {
    const contractAddress = result.address;
    const [, rawSender, rawTokenId] = result.topics;
    // TODO: Check sender
    console.log(rawSender);
    // const sender = Number(rawSender).toString(16);
    const tokenId = Number(rawTokenId).toString(16);
    try {
      const signature = await db.Signature.findOne({
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
