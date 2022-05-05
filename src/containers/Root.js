import React, { Component } from 'react';
import styled from 'styled-components';
import { ethers } from 'ethers';

import MessageSig from '../components/MessageSig';
import MessageVer from '../components/MessageVer';


class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      address: '',
      signature: '',
      verify: false,
    };
    this.signMessage = this.signMessage.bind(this);
    this.verifySig = this.verifySig.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
  }

  handleStateChange(key, value) {
    this.setState((obj) => {
      const newObj = {};
      newObj[key] = value;
      return ({
        ...obj,
        ...newObj,
      });
    });
  }

  async signMessage() {
    try {
      if (!window.ethereum)
        throw new Error('No wallet found!');
      await window.ethereum.send('eth_requestAccounts');
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signature = await signer.signMessage(this.state.message);
      const address = await signer.getAddress();
      this.setState({
        address,
        signature,
      });
    } catch (err) {
      setError(err.message);
    }
  }

  async verifySig() {
    const { message, address, signature } = this.state;
    try {
      const signerAddr = await ethers.utils.verifyMessage(message, signature);
      this.setState({
        verify: (address == signerAddr),
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { message, address, signature, verify } = this.state;
    // this.signMessage();
    return (
      <Rootwrapper>
        <MessageSig
          message={message}
          address={address}
          signature={signature}
          handleStateChange={this.handleStateChange}
          handleOnSig={this.signMessage}
        />
        <MessageVer
          verify={verify}
          handleOnVer={this.verifySig}
        />
      </Rootwrapper>
    );
  }
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
