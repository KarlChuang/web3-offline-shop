require('dotenv').config();

const { ethers } = require('ethers');
const db = require('../models');
const { abi: contractABI } = require('../../contract/config/DrinkNFT.json');
const { provider, signer } = require('../config');

class SignatureController {
  static async getAll(req, res) {
    try {
      const signatures = await db.Signature.findAll();
      res.status(200).json(signatures);
    } catch (err) {
      res.status(500);
    }
  }

  static async verify(req, res) {
    try {
      const {
        address,
        message,
        signature,
        contractAddr,
        time,
      } = req.body;
      // 42 is the length of contract address
      const nftId = Number(message.substr(42));
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
        await contractSigner.destroyNFT(
          nftId,
          signature,
        );

        res.json({ valid: true, message: '(͠≖ ͜ʖ͠≖)👌' });
      }
    } catch (err) {
      console.log(err);
      res.json({ valid: false, message: 'server err' });
    }
  }
}

module.exports = SignatureController;
