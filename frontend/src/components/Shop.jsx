import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Waiting from './Waiting';

function Shop({
  contractList,
}) {
  if (contractList === undefined) {
    return (<Waiting />);
  }
  return (
    <Rootwrapper>
      <ContractList>
        {
          contractList && contractList.map(({ address, name, uri: imageUri }) => (
            <ContractBlock key={address} to={`/mint/${address}`} img={imageUri}>{name}</ContractBlock>
          ))
        }
      </ContractList>
    </Rootwrapper>
  );
}

export default Shop;

const Rootwrapper = styled.div`
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

const ContractList = styled.div`
  width: 80%;
  padding-bottom: 20px;
`;

const ContractBlock = styled(Link)`
  color: white;
  width: 100%;
  height: 150px;
  background: transparent;
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  margin-top: 20px;
  border-radius: 10px;
  border-style: solid;
  border-width: 1px;
  border-color: white;
  word-break: break-word;
  transition: 0.2s ease;
  cursor: pointer;
  position: relative;
  text-decoration: none;
  user-select: none;
  font-size: 20px;
  font-weight: 900;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)), url(${({ img }) => img});
  background-size: 100% auto;
  background-position: 50% 50%;
  &:hover {
    background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url(${({ img }) => img});
    background-size: 150% auto;
    background-position: 50% 50%;
  }
  &:active {
    background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url(${({ img }) => img});
    background-size: 150% auto;
    background-position: 50% 50%;
  }
`;
