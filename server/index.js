const express = require('express');
const path = require('path');
const { ethers } = require('ethers');

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
  // TODO: check address in white list
  res.json({ valid: (address == signerAddr) });
});

app.listen(port || 5000, async () => {
  console.log(`listening on port ${port || 5000}`);
});
