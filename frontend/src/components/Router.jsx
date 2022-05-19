import React from 'react';
import styled from 'styled-components';
import {
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';

import NftPage from '../containers/NftPage';
import DeployPage from '../containers/DeployPage';
import ShopPage from '../containers/ShopPage';
import MintPage from '../containers/MintPage';
import AccountNFTs from './AccountNFTs';

function Router({
  address, nftList,
}) {
  const { pathname } = useLocation();
  return (
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
          <Route
            exact
            path="/deploy/"
            element={<DeployPage />}
          />
          <Route
            exact
            path="/shop/"
            element={<ShopPage />}
          />
          <Route
            exact
            path="/mint/:contractAddr"
            element={<MintPage />}
          />
        </Routes>
      </Display>
      <BottomBar>
        <DeployLink pathname={pathname} to="/">My NFTs</DeployLink>
        <DeployLink pathname={pathname} to="/deploy/">Deploy</DeployLink>
        <DeployLink pathname={pathname} to="/shop/">Shop</DeployLink>
      </BottomBar>
    </Rootwrapper>
  );
}

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

const BottomBar = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
`;

const DeployLink = styled(Link)`
  flex-grow: 1;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: ${({ pathname, to }) => ((pathname === to) ? '#6b0600' : '#000000b3')};
  color: ${({ pathname, to }) => ((pathname === to) ? 'white' : '#ffffff6e')};
  height: 38px;
  font-size: 15px;
  font-weight: 900;
  transition: 0.2s ease;
  user-select: none;
  text-decoration: none;
  &:active {
    transition: 0s ease;
    background-color: #6b0600;
  }
`;
