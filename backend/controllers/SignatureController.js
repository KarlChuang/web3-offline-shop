require('dotenv').config();

const { ethers } = require('ethers');
const db = require('../models');
const { abi: contractABI } = require('../../contract/config/DrinkNFT.json');
const { provider, signer } = require('../config');

class SignatureController {
  static async verify(req, res) {
    try {
      const {
        address,
        message,
        signature,
        contractAddr,
        time,
      } = req.body;
      const nftId = Number(message);
      const signerAddr = await ethers.utils.verifyMessage(message, signature);

      const contract = new ethers.Contract(contractAddr, contractABI, provider);
      const tokenOwner = await contract.ownerOf(nftId);

      if (address !== signerAddr) {
        res.json({ valid: false, message: 'Signature and address mismatch' });
      } else if (address !== tokenOwner) {
        res.json({ valid: false, message: 'Address not own the NFT' });
      } else if (new Date().getTime() - new Date(time).getTime() >= 30000) {
        res.json({ valid: false, message: 'Timestamp expired' });
      } else {
        await db.Signature.create({
          signer: address,
          message,
          contractAddress: contractAddr,
          tokenId: nftId,
          digest: signature,
        });
        const contractSigner = contract.connect(signer);
        // const tokenId = nftId.toString();
        // console.log('message', typeof(message))
        await contractSigner.destroyNFT(
          nftId,
          signature,
          message,
          message.length,
        );

        res.json({ valid: true, message: '(͠≖ ͜ʖ͠≖)👌' });
      }
    } catch (err) {
      console.log(err);
      res.json({ valid: false, message: err });
    }
  }
}

module.exports = SignatureController;
