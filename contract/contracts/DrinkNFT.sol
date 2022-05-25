//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "hardhat/console.sol";

contract DrinkNFT is ERC721Enumerable, Ownable {
    // Declare Variables
    uint256 public mintPrice = 0.03 ether;
    uint256 public mintLimit;
    uint256 public bonusThreshold;

    string public imageURI;

    mapping(address => uint256) bonus;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _price,
        uint256 _limit,
        string memory _imageURI,
        uint256 _bonusThreshold
    ) ERC721(_name, _symbol) {
        mintPrice = _price;
        mintLimit = _limit;
        imageURI = _imageURI;
        bonusThreshold = _bonusThreshold;
    }

    // Events
    event Mint(address indexed _from, uint256 indexed _id);
    event Burn(address indexed _from, uint256 indexed _id);

    function mintNFT(uint256 tokenQuantity) public payable {
        require(mintPrice * tokenQuantity <= msg.value, "Not enough ether.");
        require(_tokenIds.current() < mintLimit, "No NFT can be mint.");

        for (uint256 i = 0; i < tokenQuantity; i++) {
            _tokenIds.increment();
            uint256 newItemId = _tokenIds.current();
            _safeMint(msg.sender, newItemId);
        }
        emit Mint(msg.sender, _tokenIds.current());
    }

    function destroyNFT(uint256 tokenId, bytes memory signature) public {
        address currentContract = address(this);
        bytes memory message = abi.encodePacked(currentContract, tokenId);
        console.logBytes(message);
        address signer = verifySignature(string(message), signature);
        address owner = ownerOf(tokenId);
        console.logAddress(signer);
        console.logAddress(owner);

        require(signer == owner, "Signer and NFT owner not match.");

        _burn(tokenId);
        emit Burn(msg.sender, tokenId);
    }

    function getImageURI() public view returns (string memory) {
        return imageURI;
    }

    function verifySignature(string memory message, bytes memory signature)
        public
        pure
        returns (address)
    {
        bytes memory prefix = abi.encodePacked(
            "\x19Ethereum Signed Message:\n106"
        );

        // bytes32 signedMessage = keccak256(bytes.concat(bytes(prefix), bytes(message)));
        bytes32 signedMessage = keccak256(abi.encodePacked(prefix, message));
        address signer = recoverSigner(signedMessage, signature);
        return signer;
    }

    function recoverSigner(bytes32 signedMessage, bytes memory signature)
        public
        pure
        returns (address)
    {
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(signature);

        return ecrecover(signedMessage, v, r, s);
    }

    function splitSignature(bytes memory sig)
        public
        pure
        returns (
            bytes32 r,
            bytes32 s,
            uint8 v
        )
    {
        require(sig.length == 65, "invalid signature length");

        assembly {
            /*
            First 32 bytes stores the length of the signature

            add(sig, 32) = pointer of sig + 32
            effectively, skips first 32 bytes of signature

            mload(p) loads next 32 bytes starting at the memory address p into memory
            */

            // first 32 bytes, after the length prefix
            r := mload(add(sig, 32))
            // second 32 bytes
            s := mload(add(sig, 64))
            // final byte (first byte of the next 32 bytes)
            v := byte(0, mload(add(sig, 96)))
        }

        // implicitly return (r, s, v)
    }

    function setMintPrice(uint256 _mintPrice) public onlyOwner {
        mintPrice = _mintPrice;
    }

    function getRemainNFTNum() public view returns (uint256) {
        return mintLimit - _tokenIds.current();
    }
}
