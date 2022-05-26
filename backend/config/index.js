const ethers = require('ethers');

const network = process.env.NETWORK_URL;
// export const provider = ethers.getDefaultProvider(network);
const provider = new ethers.providers.JsonRpcProvider(network);
let signer;
const env = process.env.NODE_ENV;

if (env && env === 'production') {
  const { PRIVATE_KEY } = process.env;
  signer = new ethers.Wallet(PRIVATE_KEY, provider);
} else {
  signer = provider.getSigner();
}

module.exports = {
  network,
  provider,
  signer,
};
