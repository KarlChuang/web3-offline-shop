/* eslint-disable */ 

// We import Chai to use its asserting functions here.
const { expect } = require("chai");



// `describe` is a Mocha function that allows you to organize your tests. It's
// not actually needed, but having your tests organized makes debugging them
// easier. All Mocha functions are available in the global scope.

// `describe` receives the name of a section of your test suite, and a callback.
// The callback must define the tests of that section. This callback can't be
// an async function.
describe("DrinkNFT contract", function () {
  // Mocha has four functions that let you hook into the test runner's
  // lifecyle. These are: `before`, `beforeEach`, `after`, `afterEach`.

  // They're very useful to setup the environment for tests, and to clean it
  // up after they run.

  // A common pattern is to declare some variables, and assign them in the
  // `before` and `beforeEach` callbacks.

  let DrinkNFT;
  let hardhatDrinkNFT;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  async function mintNFT(mint_num) {
    await hardhatDrinkNFT.mintNFT(mint_num);

    const owner_num = await hardhatDrinkNFT.balanceOf(owner.address);
    expect(owner_num).to.equal(mint_num);
  }
  // `beforeEach` will run before each test, re-deploying the contract every
  // time. It receives a callback, which can be async.
  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    DrinkNFT = await ethers.getContractFactory("DrinkNFT");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // To deploy our contract, we just have to call DrinkNFT.deploy() and await
    // for it to be deployed(), which happens once its transaction has been
    // mined.
    const name_ = "NFT"
    const symbol_ = "Trash"
    const price = 3;
    const limit = 50;
    hardhatDrinkNFT = await DrinkNFT.deploy(name_, symbol_, price, limit);
    await hardhatDrinkNFT.setMintPrice(0);

    const name = await hardhatDrinkNFT.name()
    console.log("Name: ", name)

  });

  // You can nest describe calls to create subsections.
  describe("Deployment", function () {
    // `it` is another Mocha function. This is the one you use to define your
    // tests. It receives the test name, and a callback function.

    // If the callback function is async, Mocha will `await` it.
    it("Should set the right owner", async function () {
      // Expect receives a value, and wraps it in an Assertion object. These
      // objects have a lot of utility methods to assert values.

      // This test expects the owner variable stored in the contract to be equal
      // to our Signer's owner.
      expect(await hardhatDrinkNFT.owner()).to.equal(owner.address);
    });

  });
  describe("Mint NFT", function () {
    it("Should mint single NFT", async function () {
      // Mint 1 NFT
      await mintNFT(1);
    });

    it("Should mint multiple NFT", async function () {
      // Mint 5 NFT
      await mintNFT(5);
    })
  });
  describe("Destroy NFT", function () {
    it("Should destroy NFT", async function () {
      // Mint 1 NFT
      await mintNFT(1);
      // Burn token
      const tokenId = 1;

      const signer = owner;
      // Sign the binary data
      const msg = tokenId.toString()
      const signature = await signer.signMessage(msg);
      
      await hardhatDrinkNFT.destroyNFT(tokenId, signature, msg, msg.length);
      const owner_num_after_destroy = await hardhatDrinkNFT.balanceOf(owner.address);
      expect(owner_num_after_destroy).to.equal(0);
    })
  })

  describe("Fetch user's NFTs", function () {
    it("Should check user's NFTs", async function () {
      // Mint 2 NFT
      await mintNFT(3);

      // Get user's token
      const nft_num = await hardhatDrinkNFT.balanceOf(owner.address);
      for (let i = 0; i < nft_num; i++) {
        const tokenId = await hardhatDrinkNFT.tokenOfOwnerByIndex(owner.address, i);
        // Check tokenid belongs to user
        expect(await hardhatDrinkNFT.ownerOf(tokenId)).to.equal(owner.address);
      }
    })
  })

  describe("Signature Verification", function () {
    it("Should verify the signature", async function () {
      let msg = "abcd";
      const signer = owner;
      // Sign the binary data
      const signature = await signer.signMessage(msg);
      const sig_address = await hardhatDrinkNFT.verifySignature(msg, signature, msg.length)
      console.log("address", msg)

      const address = await signer.getAddress();
      expect(address).to.equal(sig_address)

    })
  })

});