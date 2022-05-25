import React from 'react';
import styled from 'styled-components';

import Waiting from './Waiting';

function DeployNftContract({
  pageState,
  nftName,
  changeNameChange,
  nftSymbol,
  changeSymbolChange,
  nftMintPrice,
  changeMintPriceChange,
  nftLimit,
  changeLimitChange,
  nftImage,
  changeImage,
  offerAble,
  changeOfferAble,
  offerNum,
  changeOfferNum,
  handleDeploy,
}) {
  if (pageState === 'loading') {
    return (<Waiting />);
  }
  return (
    <Rootwrapper>
      <Title>Name</Title>
      <Input value={nftName} onChange={(e) => changeNameChange(e.target.value)} />
      <Title>Symbol</Title>
      <Input value={nftSymbol} onChange={(e) => changeSymbolChange(e.target.value)} />
      <Title>Mint Price</Title>
      <Row>
        <InputEther type="number" value={nftMintPrice} onChange={(e) => changeMintPriceChange(e.target.value)} />
        <ValueUnit>ether</ValueUnit>
      </Row>
      <Title>Limit</Title>
      <Input type="number" value={nftLimit} onChange={(e) => changeLimitChange(e.target.value)} />
      <Title>Special Offers</Title>
      <Row>
        <Switch>
          <SwitchInput
            type="checkbox"
            value={offerAble}
            onChange={(e) => changeOfferAble((e.target.value === 'off') ? 'on' : 'off')}
          />
          <Slider offer={offerAble} />
        </Switch>
        <InputEther
          offer={offerAble}
          type="number"
          value={offerNum}
          onChange={(e) => changeOfferNum(e.target.value)}
        />
        <ValueUnit offer={offerAble}>for 1</ValueUnit>
      </Row>
      <Title>Image</Title>
      <InputImg
        type="file"
        accept="image/*"
        onChange={(e) => changeImage(e.target.files[0] || undefined)}
      />
      <ImgPreview src={nftImage && URL.createObjectURL(nftImage)} />
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

const Row = styled.div`
  width: 80%;
  margin-bottom: 10px;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
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
  text-align: right;
`;

const InputEther = styled(Input)`
  width: 0;
  flex-grow: 1;
  margin: 0;
  display: ${({ offer }) => ((offer === 'off') ? 'none' : 'inline-block')}
`;

const InputImg = styled(Input)`
  font-size: 15px;
  height: 25px;
`;

const ValueUnit = styled.div`
  font-size: 17px;
  font-weight: 900;
  color: white;
  padding-left: 5px;
  white-space: nowrap;
  display: ${({ offer }) => ((offer === 'off') ? 'none' : 'block')}
`;

const ImgPreview = styled.img`
  width: 80%;
`;

const DeployBtn = styled.button`
  color: black;
  height: 50px;
  padding: 10px 20px;
  border: none;
  margin-top: 30px;
  margin-bottom: 30px;
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

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  margin-right: 10px;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ offer }) => ((offer === 'off') ? '#ccc' : '#2196F3')};
  -webkit-transition: .4s;
  transition: .4s;
  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
    transform: ${({ offer }) => ((offer === 'off') ? 'translateX(0)' : 'translateX(26px)')};
  }
`;
