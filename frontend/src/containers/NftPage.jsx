import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

import MessageVer from '../components/MessageVer';
import contractJson from '../../../contract/config/DrinkNFT.json';

const { abi: contractABI } = contractJson;

const signMessage = async (msg) => {
  if (!window.ethereum) throw new Error('No wallet found!');
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const signature = await signer.signMessage(msg);
  const address = await signer.getAddress();
  return { address, signature };
};

function NftPage() {
  const { state } = useLocation();
  const [verify, setVerify] = useState('');
  const [verifyMsg, setMsg] = useState('Click to verify');
  const [nftName, setNftName] = useState('');
  const { contractAddr, nftId } = useParams();

  useEffect(() => {
    if (state) {
      setNftName(state.nftName);
      setVerify('Invalid');
    } else {
      const fetchNftName = async () => {
        try {
          if (!window.ethereum) throw new Error('No wallet found!');
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const contract = new ethers.Contract(contractAddr, contractABI, provider);
          const name = await contract.name();
          setNftName(`${name} #${nftId}`);
          setVerify('Invalid');
        } catch (err) {
          console.log(err);
          setVerify('Invalid');
        }
      };
      fetchNftName();
    }
  }, []);

  const handleOnVerify = async () => {
    try {
      setVerify('');
      const message = JSON.stringify({
        contractAddr,
        nftId,
        time: new Date().toString(),
      });
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
    <MessageVer
      name={nftName}
      verify={verify}
      verifyMsg={verifyMsg}
      handleOnVer={handleOnVerify}
    />
  );
}

export default NftPage;
