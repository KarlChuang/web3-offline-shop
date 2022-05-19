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
          contractList.map(({ contractAddr, name }) => (
            <ContractBlock key={contractAddr} to={`/mint/${contractAddr}`}>{name}</ContractBlock>
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
  background: transparent;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  border-style: solid;
  border-color: white;
  border-radius: 6px;
  border-width: 2px;
  word-break: break-word;
  transition: 0.2s ease;
  cursor: pointer;
  position: relative;
  text-decoration: none;
  user-select: none;
  font-size: 20px;
  font-weight: 900;
  &:hover {
    background-color: white;
    color: #6b0600;
  }
  &:active {
    background-color: white;
  }
`;
