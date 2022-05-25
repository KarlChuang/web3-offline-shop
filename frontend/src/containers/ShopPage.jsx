import React, { useState, useEffect } from 'react';
import services from '../api';

import Shop from '../components/Shop';

function ShopPage() {
  const [contractList, setContractList] = useState(undefined);
  useEffect(() => {
    const getContract = async () => {
      // console.log('TODO: Get contract image URI from backend contract list');
      const contracts = await services.contracts.getAll();
      setContractList(contracts.data);
    };
    getContract();
  }, []);
  return <Shop contractList={contractList} />;
}

export default ShopPage;
