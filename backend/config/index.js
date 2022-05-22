const ethers = require('ethers');

const network = process.env.NETWORK_URL;
// export const provider = ethers.getDefaultProvider(network);
const provider = new ethers.providers.JsonRpcProvider(network);
const signer = provider.getSigner();

module.exports = {
  network,
  provider,
  signer,
};
