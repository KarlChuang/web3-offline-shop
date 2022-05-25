import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Waiting from './Waiting';

function AccountNFTs({
  nftList,
}) {
  if (nftList === undefined) return (<Waiting />);
  return (
    <NftList>
      {
        nftList.map(({
          id, name, used, imageUri,
        }) => ((used) ? (
          <NftUsedBlock key={id} img={imageUri}>
            {name}
          </NftUsedBlock>
        ) : (
          <NftBlock key={id} to={`/nft/${id}`} state={{ nftName: name, imageUri }} img={imageUri}>
            {name}
          </NftBlock>
        )))
      }
      <NftUsedBlock key="test" img="https://ipfs.io/ipfs/QmPuoyRoWGmjpsbM93zL8BRQzBcFDMrvDLxbYBQvSFk8Mf">test</NftUsedBlock>
    </NftList>
  );
}

export default AccountNFTs;

const NftList = styled.div`
  width: 60%;
  padding-bottom: 20px;
`;

const NftBlock = styled(Link)`
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

const NftUsedBlock = styled.div`
  color: #ffffff59;
  width: 100%;
  height: 75px;
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  margin-top: 20px;
  border-radius: 10px;
  border-style: solid;
  border-width: 1px;
  border-color: #ffffff6e;
  word-break: break-word;
  position: relative;
  user-select: none;
  font-size: 20px;
  font-weight: 900;
  background: linear-gradient(rgba(107, 27, 16, 0.4), rgba(107, 27, 16, 0.9)), url(${({ img }) => img});
  background-size: 100% auto;
  background-position: 50% 50%;
`;
