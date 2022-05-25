const ethers = require('ethers');

const network = process.env.NETWORK_URL;
// export const provider = ethers.getDefaultProvider(network);
const provider = new ethers.providers.JsonRpcProvider(network);
const { PRIVATE_KEY } = process.env;
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

module.exports = {
  network,
  provider,
  signer,
};
