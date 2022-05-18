import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Waiting from './Waiting';

function AccountNFTs({
  nftList,
}) {
  if (nftList === undefined) return (<Waiting />);
  return (
    <Rootwrapper>
      <Scroll>
        <NftList>
          {
            nftList.map(({ id, name }) => (
              <NftBlock key={id} to={`/nft/${id}`} state={{ nftName: name }}>
                {name}
              </NftBlock>
            ))
          }
        </NftList>
      </Scroll>
      <DeployLink to="/deploy">Deploy NFT</DeployLink>
    </Rootwrapper>
  );
}

export default AccountNFTs;

const Rootwrapper = styled.div`
  width: 100%;
  height: inherit;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
`;

const Scroll = styled(Rootwrapper)`
  flex-grow: 1;
  overflow: scroll;
`;

const NftList = styled.div`
  width: 60%;
  padding-bottom: 20px;
`;

const NftBlock = styled(Link)`
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

const DeployLink = styled(Link)`
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 40px;
  background-color: black;
  color: white;
  border: 0;
  font-size: 18px;
  font-weight: 900;
  transition: 0.2s ease;
  user-select: none;
  text-decoration: none;
  &:active {
    transition: 0s ease;
    background-color: white;
  }
`;
