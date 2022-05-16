import React from 'react';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';

import NftPage from '../containers/NftPage';
import AccountNFTs from './AccountNFTs';

const Router = ({
  address,
  nftList,
}) => (
    <Rootwrapper>
      <AddrDisplay>
        <AddrShow>{address}</AddrShow>
      </AddrDisplay>
      <Display>
        <Routes>
          <Route
            exact
            path="/"
            element={<AccountNFTs nftList={nftList} />}
          />
          <Route
            exact
            path="/nft/:contractAddr/:nftId"
            element={<NftPage />}
          />
        </Routes>
      </Display>
    </Rootwrapper>
);

export default Router;

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

const AddrDisplay = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  background-color: black;
  color: white;
`;

const AddrShow = styled.div`
  width: 90%;
  font-size: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Display = styled(Rootwrapper)`
  flex-grow: 1;
  overflow: scroll;
`;
