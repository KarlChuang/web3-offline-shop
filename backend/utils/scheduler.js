const cron = require('node-cron');
const ethers = require('ethers');

const db = require('../models');
const { abi: contractABI } = require('../../contract/config/DrinkNFT.json');
const { provider, signer } = require('../config');

async function sendBurnTransaction(signature) {
  const { contractAddress, tokenId, digest } = signature;

  const contract = new ethers.Contract(contractAddress, contractABI, provider);

  const contractSigner = contract.connect(signer);
  await contractSigner.destroyNFT(tokenId, digest, tokenId.length);
}

// This task run every 10 minutes
async function runScheduler() {
  cron.schedule('*/15 * * * *', () => {
    // TODO: Iterate through Redis and repost transaction
    try {
      const signatures = db.Signature.findAll({});
      console.log('unhandled signatures: ', signatures);

      signatures.map(async (signature) => {
        await sendBurnTransaction(signature);
      });
    } catch (err) {
      console.log(err);
    }
  });
}
module.exports = runScheduler;
