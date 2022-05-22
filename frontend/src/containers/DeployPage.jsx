import React, { useState } from 'react';
import { ethers, ContractFactory } from 'ethers';
// import { useParams, useLocation } from 'react-router-dom';
// import axios from 'axios';

import DeployNftContract from '../components/DeployNftContract';
import contractJson from '../../../contract/config/DrinkNFT.json';
import services from '../api';

const { abi: contractAbi, bytecode: contractByteCode } = contractJson;

function DeployPage() {
  const [nftName, changeNameChange] = useState('');
  const [nftSymbol, changeSymbolChange] = useState('');
  const [nftMintPrice, changeMintPriceChange] = useState('');
  const [nftLimit, changeLimitChange] = useState('');
  const [pageState, changePageState] = useState('');

  const handleDeploy = async () => {
    changePageState('loading');
    try {
      if (!window.ethereum) throw new Error('No wallet found!');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const factory = new ContractFactory(
        contractAbi,
        contractByteCode,
        signer,
      );
      const contract = await factory.deploy(
        nftName,
        nftSymbol,
        ethers.utils.parseEther(nftMintPrice),
        Number(nftLimit),
      );
      await contract.deployed();

      await services.contracts.addContract({
        address: contract.address,
        name: nftName,
        symbol: nftSymbol,
      });

      changePageState('');
      console.log('contract address:', contract.address);
    } catch (err) {
      console.log(err);
      changePageState('');
    }
  };

  return (
    <DeployNftContract
      pageState={pageState}
      nftName={nftName}
      changeNameChange={changeNameChange}
      nftSymbol={nftSymbol}
      changeSymbolChange={changeSymbolChange}
      nftMintPrice={nftMintPrice}
      changeMintPriceChange={changeMintPriceChange}
      nftLimit={nftLimit}
      changeLimitChange={changeLimitChange}
      handleDeploy={handleDeploy}
    />
  );
}

export default DeployPage;
