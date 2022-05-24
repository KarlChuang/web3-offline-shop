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
        nftList.map(({ id, name, used }) => ((used) ? (null) : (
          <NftBlock key={id} to={`/nft/${id}`} state={{ nftName: name }}>
            {name}
          </NftBlock>
        )))
      }
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
