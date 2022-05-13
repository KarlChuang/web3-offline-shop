//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract DrinkNFT is ERC721Enumerable, Ownable {
    // Declare Variables
    uint256 public mintPrice = 0.03 ether;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Drink-NFT", "Drink-NFT") {}

    function mintNFT(uint256 tokenQuantity)
        public payable
    {
        // address recipient = msg.sender;
        require(mintPrice * tokenQuantity <= msg.value, "Not enough ether." );


        for(uint256 i = 0; i < tokenQuantity; i++) {
            _tokenIds.increment();
            uint256 newItemId = _tokenIds.current();
            _safeMint(msg.sender, newItemId);
            // _setTokenURI(newItemId, tokenURI);
        }
    }

    function destroyNFT(uint256 tokenId) public
    {
        address owner = ownerOf(tokenId);
        require(msg.sender == owner, "Sender and NFT owner not the same.");
        _burn(tokenId);
    }

    function setMintPrice(uint256 _mintPrice) public onlyOwner {
        mintPrice = _mintPrice;
    }

}
