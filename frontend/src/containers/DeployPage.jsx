import React, { useState } from 'react';
import { ethers, ContractFactory } from 'ethers';
import { create } from 'ipfs-http-client';

import DeployNftContract from '../components/DeployNftContract';
import contractJson from '../../../contract/config/DrinkNFT.json';
import services from '../api';

const { abi: contractAbi, bytecode: contractByteCode } = contractJson;
const client = create('https://ipfs.infura.io:5001/api/v0');

function DeployPage() {
  const [NFT, changeNFT] = useState({
    name: '',
    symbol: '',
    mintPrice: '',
    limit: '',
    image: undefined,
    offerAble: 'off',
    offerNum: '',
  });
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

      const added = await client.add(NFT.image);
      const uri = `https://ipfs.infura.io/ipfs/${added.path}`;
      // console.log('ipfs:', uri);
      console.log('TODO: bonus threshold when \'off\'');
      const contract = await factory.deploy(
        NFT.name,
        NFT.symbol,
        ethers.utils.parseEther(NFT.mintPrice),
        Number(NFT.limit),
        uri,
        (NFT.offerAble === 'off') ? 100000 : Number(NFT.offerNum),
      );
      await contract.deployed();

      // console.log('TODO: send image URI to backend');
      await services.contracts.addContract({
        address: contract.address,
        name: NFT.name,
        symbol: NFT.symbol,
        uri,
      });

      changePageState('');
      // console.log('contract address:', contract.address);
    } catch (err) {
      console.log(err);
      changePageState('');
    }
  };

  return (
    <DeployNftContract
      pageState={pageState}
      NFT={NFT}
      changeNFT={changeNFT}
      handleDeploy={handleDeploy}
    />
  );
}

export default DeployPage;
