import React, { useState } from 'react';
import styled from 'styled-components';
import { ethers } from 'ethers';

import MessageSig from '../components/MessageSig';
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
    setError(err.message);
  }
}

const verifySig = async (message, address, signature) => {
  try {
    const signerAddr = await ethers.utils.verifyMessage(message, signature);
    return (address == signerAddr);
  } catch (err) {
    console.log(err);
  }
}


const Root = () => {
  const [message, setMsg] = useState('');
  const [address, setaddr] = useState('');
  const [signature, setSig] = useState('');
  const [verify, setVerify] = useState(false);
  return (
    <Rootwrapper>
      <MessageSig
        message={message}
        address={address}
        signature={signature}
        handleInput={(value) => setMsg(value)}
        handleOnSig={async () => {
          const { address, signature } = await signMessage(message);
          setaddr(address);
          setSig(signature);
        }}
      />
      <MessageVer
        verify={verify}
        handleOnVer={async () => {
          const valid = await verifySig(message, address, signature);
          setVerify(valid);
        }}
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
