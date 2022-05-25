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
    uint256 public bonusNum = 1;

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
    event Burn(address indexed _from, uint256 indexed _id);

    // Getter functions
    function getImageURI() public view returns (string memory) {
        return imageURI;
    }

    function getUserBonus(address userAddress) public view returns (uint256) {
        // console.logAddress(userAddress);
        return bonus[userAddress];
    }

    function getRemainNFTNum() public view returns (uint256) {
        return mintLimit - _tokenIds.current();
    }
    
    // Setter functions
    function setMintPrice(uint256 _mintPrice) public onlyOwner {
        mintPrice = _mintPrice;
    }

    function setMintLimit(uint256 _mintLimit) public onlyOwner {
        mintLimit = _mintLimit;
    }

    function setImageURI(string memory _imageURI) public onlyOwner {
        imageURI = _imageURI;
    }

    function setBonus(uint256 _bonusThreshold, uint256 _bonusNum) public onlyOwner {
        bonusThreshold = _bonusThreshold;
        bonusNum = _bonusNum;
    }

    // Utility functions

    function mintNFT(uint256 tokenQuantity) public payable {
        require(mintPrice * tokenQuantity <= msg.value, "Not enough ether.");
        require(_tokenIds.current() < mintLimit, "No NFT can be mint.");

        for (uint256 i = 0; i < tokenQuantity; i++) {
            _tokenIds.increment();
            uint256 newItemId = _tokenIds.current();
            _safeMint(msg.sender, newItemId);
        }
    }

    function delegateMintNFT(uint256 tokenQuantity, address target) public payable {
        require(mintPrice * tokenQuantity <= msg.value, "Not enough ether.");
        require(_tokenIds.current() < mintLimit, "No NFT can be mint.");

        for (uint256 i = 0; i < tokenQuantity; i++) {
            _tokenIds.increment();
            uint256 newItemId = _tokenIds.current();
            _safeMint(target, newItemId);
        }
    }

    function destroyNFT(uint256 tokenId, bytes memory signature) public {
        string memory tokenString;
        uint256 token_length;
        string memory currentContract = Strings.toHexString(uint256(uint160(address(this))), 20);
        (tokenString, token_length) = toString(tokenId);

        string memory message = string(abi.encodePacked(currentContract, tokenString ));
        
        uint256 message_length = 42 + token_length;

        // console.logString(message);
        address signer = verifySignature(message, signature, message_length);
        address owner = ownerOf(tokenId);
        // console.logAddress(signer);
        // console.logAddress(owner);

        require(signer == owner, "Signer and NFT owner not match.");

        _burn(tokenId);
        bonus[signer] += 1;

        if (bonus[signer] >= bonusThreshold) {
            // Free mint new NFT
            delegateMintNFT(bonusNum, signer);
            bonus[signer] -= bonusThreshold;
        }
        emit Burn(msg.sender, tokenId);
    }

    

    function verifySignature(string memory message, bytes memory signature, uint256 message_length)
        public
        pure
        returns (address)
    {
        bytes memory prefix = abi.encodePacked(
            "\x19Ethereum Signed Message:\n",
            Strings.toString(message_length)
        );
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
        internal
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
    // Utility function referenced from https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Strings.sol
    function toString(uint256 value) internal pure returns (string memory, uint256) {
        // Inspired by OraclizeAPI's implementation - MIT licence
        // https://github.com/oraclize/ethereum-api/blob/b42146b063c7d6ee1358846c198246239e9360e8/oraclizeAPI_0.4.25.sol

        if (value == 0) {
            return ("0", 1);
        }
        uint256 temp = value;
        uint256 digits;
        uint256 length;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        length = digits;
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return (string(buffer), length);
    }

    
}
