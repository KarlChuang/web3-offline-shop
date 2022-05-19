const { ethers } = require('ethers');
const { abi: contractABI } = require('../../contract/config/DrinkNFT.json');

class SignatureController {
  static async verify(req, res) {
    const { address, message, signature } = req.body;
    const { time, contractAddr, nftId } = JSON.parse(message);
    const signerAddr = await ethers.utils.verifyMessage(message, signature);

    const provider = new ethers.providers.JsonRpcProvider(
      'http://localhost:8545',
    );
    const contract = new ethers.Contract(contractAddr, contractABI, provider);
    const tokenOwner = await contract.ownerOf(nftId);

    if (address !== signerAddr) {
      res.json({ valid: false, message: 'Signature and address mismatch' });
    } else if (address !== tokenOwner) {
      res.json({ valid: false, message: 'Address not own the NFT' });
    } else if (new Date().getTime() - new Date(time).getTime() >= 30000) {
      res.json({ valid: false, message: 'Timestamp expired' });
    } else {
      // TODO: Add signature to database
      res.json({ valid: true, message: '(͠≖ ͜ʖ͠≖)👌' });
    }
  }
}

export default SignatureController;
