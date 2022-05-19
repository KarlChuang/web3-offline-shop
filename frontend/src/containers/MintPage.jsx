import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useParams } from 'react-router-dom';
// import axios from 'axios';

import MintNFT from '../components/MintNFT';
import contractJson from '../../../contract/config/DrinkNFT.json';

const { abi: contractABI } = contractJson;

function MintPage() {
  const [nftName, setNftName] = useState('Error');
  const [mintPrice, setMintPrice] = useState('1000000000');
  const [priceUnit, setPriceUnit] = useState('ether');
  const [mintNum, setMintNum] = useState(-1);
  const { contractAddr } = useParams();

  let totalPrice = 0;
  if (Number(mintNum) > 0) {
    totalPrice = Number(mintPrice) * mintNum;
  }

  useEffect(() => {
    const fetchNft = async () => {
      try {
        if (!window.ethereum) throw new Error('No wallet found!');
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddr, contractABI, provider);
        const name = await contract.name();
        const price = await contract.mintPrice();
        setNftName(name);
        if (price > 1000000000000) {
          setMintPrice(ethers.utils.formatUnits(price, 'ether'));
        } else {
          setMintPrice(ethers.utils.formatUnits(price, 'wei'));
          setPriceUnit('wei');
        }
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
          value: ethers.utils.parseUnits(totalPrice.toString(), priceUnit),
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MintNFT
      nftName={nftName}
      mintPriceEther={mintPrice}
      mintNum={mintNum}
      setMintNum={setMintNum}
      totalPriceEther={totalPrice}
      handleMint={handleMint}
      priceUnit={priceUnit}
    />
  );
}

export default MintPage;
