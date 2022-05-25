import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useParams, useLocation } from 'react-router-dom';

import MessageVer from '../components/MessageVer';
import contractJson from '../../../contract/config/DrinkNFT.json';
import services from '../api';

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
  const [imageUri, setImageUri] = useState('');
  const { contractAddr, nftId } = useParams();

  useEffect(() => {
    if (state) {
      setNftName(state.nftName);
      setImageUri(state.imageUri);
      setVerify('Invalid');
    } else {
      const fetchNftName = async () => {
        try {
          if (!window.ethereum) throw new Error('No wallet found!');
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const contract = new ethers.Contract(contractAddr, contractABI, provider);
          const name = await contract.name();
          setNftName(`${name} #${nftId}`);
          console.log('TODO: get Image URI');
          setImageUri('https://ipfs.io/ipfs/QmPuoyRoWGmjpsbM93zL8BRQzBcFDMrvDLxbYBQvSFk8Mf');
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
      const message = nftId.toString();
      const { address, signature } = await signMessage(message);

      const res = await services.signatures.verify({
        address,
        message,
        signature,
        contractAddr,
        time: new Date().toString(),
      });
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
      imageUri={imageUri}
      verify={verify}
      verifyMsg={verifyMsg}
      handleOnVer={handleOnVerify}
    />
  );
}

export default NftPage;
