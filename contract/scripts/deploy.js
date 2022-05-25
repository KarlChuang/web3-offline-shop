const fs = require('fs');
const path = require('path');
const { ethers, network, artifacts } = require('hardhat');

function saveFrontendFiles(drinkNFT) {
  const contractsDir = path.resolve(__dirname, '..', 'config');

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.resolve(contractsDir, 'contract-address.json'),
    JSON.stringify({ DrinkNFT: drinkNFT.address }, undefined, 2),
  );

  const DrinkNFTArtifact = artifacts.readArtifactSync('DrinkNFT');

  fs.writeFileSync(
    path.resolve(contractsDir, 'DrinkNFT.json'),
    JSON.stringify(DrinkNFTArtifact, null, 2),
  );
}

// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.
async function main() {
  // This is just a convenience check
  if (network.name === 'hardhat') {
    console.warn(
      'You are trying to deploy a contract to the Hardhat Network, which'
      + 'gets automatically created and destroyed every time. Use the Hardhat'
      + ' option "--network localhost"',
    );
  }

  // ethers is available in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    'Deploying the contracts with the account:',
    await deployer.getAddress(),
  );

  console.log('Account balance:', (await deployer.getBalance()).toString());

  const DrinkNFT = await ethers.getContractFactory('DrinkNFT');
  const config = {
    name: '???',
    symbol: '???',
    price: 3,
    limit: 50,
    imageURI: 'https://gg.com',
    threshold: 3,
  };
  const drinkNFT = await DrinkNFT.deploy(
    config.name,
    config.symbol,
    config.price,
    config.limit,
    config.imageURI,
    config.threshold,
  );
  await drinkNFT.deployed();

  console.log('drinkNFT address:', drinkNFT.address);

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(drinkNFT);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
