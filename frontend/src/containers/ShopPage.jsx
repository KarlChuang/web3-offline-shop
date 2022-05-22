import React, { useState, useEffect } from 'react';
import services from '../api';
// import { ethers } from 'ethers';
// import { useParams, useLocation } from 'react-router-dom';
// import axios from 'axios';

import Shop from '../components/Shop';

function ShopPage() {
  const [contractList, setContractList] = useState(undefined);
  useEffect(() => {
    const getContract = async () => {
      const contracts = await services.contracts.getAll();
      console.log('contract: ', contracts.data);
      setContractList(contracts.data);
    };
    getContract();
  }, []);
  return <Shop contractList={contractList} />;
}

export default ShopPage;
