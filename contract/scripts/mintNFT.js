const { DrinkNFT: drinkNftAddr } = require('../config/contract-address.json');
const { abi: contractABI } = require('../config/DrinkNFT.json');


async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
      "gets automatically created and destroyed every time. Use the Hardhat" +
      " option '--network localhost'"
    );
  }

  // ethers is available in the global scope
  const [signer] = await ethers.getSigners();
  const address = await signer.getAddress();
  console.log("Account address:", address);
  console.log("Account balance:", (await signer.getBalance()).toString());
  const contract = new ethers.Contract(drinkNftAddr, contractABI, signer);

  let nftNum = await contract.balanceOf(address);
  console.log(address, nftNum);

  // mint 10 (0.03 * 5 = 0.15)
  await contract.mintNFT(5, { value: ethers.utils.parseEther("0.15") });
  nftNum = await contract.balanceOf(address);
  console.log(address, nftNum);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
