const express = require('express');
const path = require('path');
const { ethers } = require('ethers');

const { abi: contractABI } = require('../contract/config/DrinkNFT.json');

const port = process.env.PORT;

const app = express();
app.use(express.json());

app.post('/api/check-address', async (req, res) => {
  const { address, message, signature } = req.body;
  const { time, contractAddr, nftId } = JSON.parse(message);
  const signerAddr = await ethers.utils.verifyMessage(message, signature);

  const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
  const contract = new ethers.Contract(contractAddr, contractABI, provider);
  const tokenOwner = await contract.ownerOf(nftId);

  if (address !== signerAddr) {
    res.json({ valid: false, message: 'Signature and address mismatch' });
  } else if (address !== tokenOwner) {
    res.json({ valid: false, message: 'Address not own the NFT' });
  } else if (new Date().getTime() - new Date(time).getTime() >= 30000) {
    res.json({ valid: false, message: 'Timestamp expired' });
  } else {
    res.json({ valid: true, message: '(͠≖ ͜ʖ͠≖)👌' });
  }
});

app.get('*/bundle.js', (req, res) => res.sendFile(path.resolve(__dirname, '..', 'frontend', 'dist', 'bundle.js')));
app.use('*', express.static(path.resolve(__dirname, '..', 'frontend', 'dist')));

app.listen(port || 5000, async () => {
  console.log(`listening on port ${port || 5000}`);
});
