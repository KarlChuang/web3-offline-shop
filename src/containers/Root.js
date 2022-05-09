import React, { useState } from 'react';
import styled from 'styled-components';
import { ethers } from 'ethers';
import axios from 'axios';

import MessageVer from '../components/MessageVer';

const signMessage = async (msg) => {
  try {
    if (!window.ethereum)
      throw new Error('No wallet found!');
    await window.ethereum.send('eth_requestAccounts');
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(msg);
    const address = await signer.getAddress();
    return { address, signature };
  } catch (err) {
    console.log(err);
  }
}

const Root = () => {
  const [verify, setVerify] = useState('Invalid');

  const handleOnVerify = async () => {
    try {
      setVerify('');
      const message = new Date().toString();
      const { address, signature } = await signMessage(message);

      const res = await axios.post('/check-address', { address, message, signature });
      setVerify(res.data.valid ? 'Valid' : 'Invalid');
    } catch (err) {
      console.log(err);
      setVerify('Invalid');
    }
  };
  
  return (
    <Rootwrapper>
      <MessageVer
        verify={verify}
        handleOnVer={handleOnVerify}
      />
    </Rootwrapper>
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
`;
