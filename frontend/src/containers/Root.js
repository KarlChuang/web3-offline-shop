import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ethers } from 'ethers';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

import Router from '../components/Router';
import contractAddr from '../../../contract/config/contract-address.json';
import contractJson from '../../../contract/config/DrinkNFT.json';

const { DrinkNFT: drinkNftAddr  } = contractAddr;
const { abi: contractABI } = contractJson;

const signMessage = async (msg) => {
  if (!window.ethereum)
    throw new Error('No wallet found!');
  await window.ethereum.send('eth_requestAccounts');
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const signature = await signer.signMessage(msg);
  const address = await signer.getAddress();
  return { address, signature };
}

const getAddress = async () => {
  if (!window.ethereum)
    throw new Error('No wallet found!');
  await window.ethereum.send('eth_requestAccounts');
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  return address;
}

const Root = () => {
  const [addr, setAddr] = useState('Address');
  const [nftList, setNftList] = useState([]);
  const [verify, setVerify] = useState('Invalid');
  const [verifyMsg, setMsg] = useState('Click to verify');

  const getNFTs = async (addr) => {
    if (addr != 'Address') {
      if (!window.ethereum)
        throw new Error('No wallet found!');
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(drinkNftAddr, contractABI, provider);

      const nftName = await contract.name();
      // const nftSymbol = await contract.symbol();
      const nftNum = await contract.balanceOf(addr);

      let list = Array.from(Array(nftNum.toNumber()).keys());
      list = list.map(async (i) => {
        const tokenId = await contract.tokenOfOwnerByIndex(addr, i);
        return {
          id: `${nftName}${tokenId.toString()}`,
          name: `${nftName} ${tokenId.toString()}`,
        };
      });
      list = await Promise.all(list);
      setNftList(list);
    }
  }

  useEffect(() => {
    getNFTs(addr);
  }, [addr]);

  useEffect(() => {
    setInterval(async () => {
      const newAddr = await getAddress();
      if (newAddr != addr) {
        setAddr(newAddr);
      }
    }, 1000);
  }, []);

  const handleOnVerify = async () => {
    try {
      setVerify('');
      const message = new Date().toString();
      const { address, signature } = await signMessage(message);

      const res = await axios.post('/api/check-address', { address, message, signature });
      setVerify(res.data.valid ? 'Valid' : 'Invalid');
      setMsg(res.data.message);
    } catch (err) {
      console.log(err);
      setVerify('Invalid');
      setMsg(err.message);
    }
  };
  
  return (
    <BrowserRouter basename={(process.env.NODE_ENV == 'production') ? '/address-prover/' : ''}>
      <Rootwrapper>
        <Router
          address={addr}
          nftList={nftList}
          verify={verify}
          verifyMsg={verifyMsg}
          handleOnVerify={handleOnVerify}
        />
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
