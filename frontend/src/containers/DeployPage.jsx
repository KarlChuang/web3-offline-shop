import React, { useState } from 'react';
import { ethers, ContractFactory } from 'ethers';
import { create } from 'ipfs-http-client';

import DeployNftContract from '../components/DeployNftContract';
import contractJson from '../../../contract/config/DrinkNFT.json';
import services from '../api';

const { abi: contractAbi, bytecode: contractByteCode } = contractJson;
const client = create('https://ipfs.infura.io:5001/api/v0');

function DeployPage() {
  const [nftName, changeNameChange] = useState('');
  const [nftSymbol, changeSymbolChange] = useState('');
  const [nftMintPrice, changeMintPriceChange] = useState('');
  const [nftLimit, changeLimitChange] = useState('');
  const [nftImage, changeImage] = useState(undefined);
  const [offerAble, changeOfferAble] = useState('off');
  const [offerNum, changeOfferNum] = useState(0);
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

      const added = await client.add(nftImage);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      console.log(url);

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
      nftImage={nftImage}
      changeImage={changeImage}
      offerAble={offerAble}
      changeOfferAble={changeOfferAble}
      offerNum={offerNum}
      changeOfferNum={changeOfferNum}
      handleDeploy={handleDeploy}
    />
  );
}

export default DeployPage;
