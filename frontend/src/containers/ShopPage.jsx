import React, { useState, useEffect } from 'react';
// import { ethers } from 'ethers';
// import { useParams, useLocation } from 'react-router-dom';
// import axios from 'axios';

import Shop from '../components/Shop';

function ShopPage() {
  const [contractList, setContractList] = useState(undefined);
  useEffect(() => {
    setTimeout(() => setContractList([
      { contractAddr: '0x5fbdb2315678afecb367f032d93f642f64180aa3', name: '???' },
      { contractAddr: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9', name: '1111' },
      { contractAddr: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707', name: '2222' },
      { contractAddr: '0x8A791620dd6260079BF849Dc5567aDC3F2FdC318', name: '3333' },
    ]), 1000);
  }, []);
  return (
    <Shop contractList={contractList} />
  );
}

export default ShopPage;
