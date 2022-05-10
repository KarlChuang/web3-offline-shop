const express = require('express');
const path = require('path');
const { ethers } = require('ethers');
const whiteList = require('../config/whiteList.json');

const port = process.env.PORT;

const app = express();
app.use(express.json());

const router = ['/'];
for (let i = 0; i < router.length; i += 1) {
  app.use(router[i], express.static(path.resolve(__dirname, '..', 'public')));
  app.use(router[i], express.static(path.resolve(__dirname, '..', 'dist')));
}

app.post('/check-address', async (req, res) => {
  const { address, message, signature } = req.body;
  const signerAddr = await ethers.utils.verifyMessage(message, signature);

  if (address != signerAddr)
    res.json({ valid: false, message: 'Mismatch signature and address' });
  else if (!whiteList.includes(address))
    res.json({ valid: false, message: 'Address not in white List' });
  else if (new Date().getTime() - new Date(message).getTime() >= 30000) {
    res.json({ valid: false, message: 'Timestamp expired' });
  } else {
    res.json({ valid: true, message: '(͠≖ ͜ʖ͠≖)👌' });
  }
});

app.listen(port || 5000, async () => {
  console.log(`listening on port ${port || 5000}`);
});
