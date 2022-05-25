import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useParams } from 'react-router-dom';
// import axios from 'axios';

import MintNFT from '../components/MintNFT';
import contractJson from '../../../contract/config/DrinkNFT.json';

const { abi: contractABI } = contractJson;

function MintPage() {
  const [mintNum, setMintNum] = useState(-1);
  const { contractAddr } = useParams();
  const [NFT, setNFT] = useState({
    name: 'Error',
    mintPrice: '1000000000',
    priceUnit: 'ether',
    remain: 0,
    imageUri: '',
  });

  let totalPrice = 0;
  if (Number(mintNum) > 0) {
    totalPrice = Number(NFT.mintPrice) * mintNum;
  }

  useEffect(() => {
    const fetchNft = async () => {
      try {
        if (!window.ethereum) throw new Error('No wallet found!');
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
          contractAddr,
          contractABI,
          provider,
        );
        const nft = {};
        nft.name = await contract.name();
        nft.price = await contract.mintPrice();
        nft.remain = await contract.getRemainNFTNum();
        console.log('TODO: get NFT image URI');
        nft.imageUri = 'https://ipfs.io/ipfs/QmPuoyRoWGmjpsbM93zL8BRQzBcFDMrvDLxbYBQvSFk8Mf';
        if (nft.price > 1000000000000) {
          nft.mintPrice = ethers.utils.formatUnits(nft.price, 'ether');
        } else {
          nft.mintPrice = ethers.utils.formatUnits(nft.price, 'wei');
          nft.priceUnit = 'wei';
        }
        setNFT({ ...NFT, ...nft });
        setMintNum(0);
      } catch (err) {
        console.log(err);
        setMintNum(0);
      }
    };
    fetchNft();
  }, []);

  const handleMint = async () => {
    try {
      if (!window.ethereum) throw new Error('No wallet found!');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddr, contractABI, signer);
      if (mintNum > 0) {
        await contract.mintNFT(mintNum, {
          value: ethers.utils.parseUnits(totalPrice.toString(), NFT.priceUnit),
        });
        window.location.href = '/';
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MintNFT
      nft={NFT}
      mintNum={mintNum}
      setMintNum={setMintNum}
      totalPriceEther={totalPrice}
      handleMint={handleMint}
    />
  );
}

export default MintPage;
