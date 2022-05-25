import React from 'react';
import styled from 'styled-components';

import Waiting from './Waiting';

function MintNFT({
  nft: {
    name, mintPrice, priceUnit, remain, imageUri,
  },
  mintNum,
  setMintNum,
  totalPriceEther,
  handleMint,
}) {
  if (mintNum < 0) {
    return (<Waiting />);
  }
  return (
    <Display>
      <NFT img={imageUri}>{name}</NFT>
      <CntDiv>
        <Row>
          <div>Mint Price</div>
          <div>{`${mintPrice} ${priceUnit}`}</div>
        </Row>
        <Row>
          <div>{`Amount (${remain} left)`}</div>
          <NumInput type="number" value={mintNum} onChange={(e) => setMintNum(e.target.value)} />
        </Row>
        <Line />
        <Row>
          <div>Total Price</div>
          <div>{`${totalPriceEther} ${priceUnit}`}</div>
        </Row>
      </CntDiv>
      <MintBtn onClick={handleMint}>Mint</MintBtn>
    </Display>
  );
}

export default MintNFT;

const Display = styled.div`
  width: 80%;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const NFT = styled.div`
  color: white;
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: column;
  justify-content: flex-end;
  background: white;
  height: 300px;
  width: 100%;
  border-radius: 15px;
  font-size: 30px;
  font-weight: 900;
  font-family: 'Ubuntu', sans-serif;
  transition: 0.25s ease;
  position: relative;
  user-select: none;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)), url(${({ img }) => img});
  background-size: 100% auto;
  background-position: 50% 50%;
`;

const CntDiv = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  margin-top: 20px;
  color: white;
`;

const Row = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: Row;
  justify-content: space-between;
  width: 100%;
  font-size: 18px;
`;

const NumInput = styled.input`
  width: 100px;
  height: 30px;
  background-color: #0000005c;
  border: none;
  font-size: 18px;
  font-weight: 900;
  color: white;
  text-align: right;
  border-radius: 5px;
`;

const Line = styled.div`
  background-color: white;
  height: 2px;
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const MintBtn = styled.button`
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
