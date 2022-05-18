import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ethers } from 'ethers';
import { BrowserRouter } from 'react-router-dom';

import Router from '../components/Router';
import contractAddr from '../../../contract/config/contract-address.json';
import contractJson from '../../../contract/config/DrinkNFT.json';

const { DrinkNFT: drinkNftAddr } = contractAddr;
const { abi: contractABI } = contractJson;

const getAddress = async () => {
  if (!window.ethereum) throw new Error('No wallet found!');
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  return address;
};

const getNFTs = async (addr) => {
  if (!ethers.utils.isAddress(addr)) return [];
  if (!window.ethereum) throw new Error('No wallet found!');
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(drinkNftAddr, contractABI, provider);

  const nftName = await contract.name();
  // const nftSymbol = await contract.symbol();
  const nftNum = await contract.balanceOf(addr);

  const tasks = [];
  for (let i = 0; i < nftNum; i += 1) {
    tasks.push(contract.tokenOfOwnerByIndex(addr, i));
  }
  const nftIds = await Promise.all(tasks);
  return nftIds.map((tokenId) => ({
    id: `${drinkNftAddr}/${tokenId.toString()}`,
    name: `${nftName} ${tokenId.toString()}`,
  }));
};

function Root() {
  const [addr, setAddr] = useState('Address');
  const [nftList, setNftList] = useState(undefined);

  useEffect(() => {
    const getAddr = async () => {
      const newAddr = await getAddress();
      if (newAddr !== addr) {
        // console.log(addr, '->', newAddr);
        setAddr(newAddr);
        try {
          setNftList(await getNFTs(newAddr));
        } catch (err) {
          console.log(err);
          setNftList([]);
        }
      }
    };
    getAddr();
  }, []);

  return (
    <BrowserRouter
      basename={process.env.NODE_ENV === 'production' ? '/address-prover/' : ''}
    >
      <Rootwrapper>
        <Router address={addr} nftList={nftList} />
      </Rootwrapper>
    </BrowserRouter>
  );
}

export default Root;

const Rootwrapper = styled.div`
  width: inherit;
  height: inherit;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  position: relative;
  background-color: #6b0600;
`;
