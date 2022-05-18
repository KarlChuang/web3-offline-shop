import React from 'react';
import styled from 'styled-components';

// import Waiting from './Waiting';

function DeployNftContract({
  nftName,
  handleNameChange,
  nftSymbol,
  handleSymbolChange,
  nftMintPrice,
  handleMintPriceChange,
  nftLimit,
  handleLimitChange,
  handleDeploy,
}) {
  return (
    <Rootwrapper>
      <Title>Name</Title>
      <Input value={nftName} onChange={(e) => handleNameChange(e.target.value)} />
      <Title>Symbol</Title>
      <Input value={nftSymbol} onChange={(e) => handleSymbolChange(e.target.value)} />
      <Title>Mint Price</Title>
      <Input type="number" value={nftMintPrice} onChange={(e) => handleMintPriceChange(e.target.value)} />
      <Title>Limit</Title>
      <Input type="number" value={nftLimit} onChange={(e) => handleLimitChange(e.target.value)} />
      <DeployBtn onClick={handleDeploy}>Deploy Contract</DeployBtn>
    </Rootwrapper>
  );
}

export default DeployNftContract;

const Rootwrapper = styled.div`
  padding-top: 30px;
  background-color: #6b0600;
  width: 100%;
  flex-grow: 1;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  overflow: scroll;
`;

const Title = styled.div`
  width: 80%;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  font-size: 17px;
  font-weight: 900;
  color: white;
  margin-top: 10px;
`;

const Input = styled.input`
  width: 80%;
  margin-bottom: 10px;
  height: 40px;
  background-color: #0000005c;
  border: none;
  font-size: 25px;
  font-weight: 900;
  color: white;
`;

const DeployBtn = styled.button`
  color: black;
  height: 50px;
  padding: 10px 20px;
  border: none;
  margin-top: 30px;
  width: 70%;
  font-size: 20px;
  border-radius: 50px;
  background-color: #ffffffbd;
  font-weight: 900;
  cursor: pointer;
  transition: 0.25s ease;
  user-select: none;
  &:active {
    background-color: white;
    transition: 0s ease;
  }
`;
