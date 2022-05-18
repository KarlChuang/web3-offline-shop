import React, { useState } from 'react';
// import { ethers } from 'ethers';
// import { useParams, useLocation } from 'react-router-dom';
// import axios from 'axios';

import DeployNftContract from '../components/DeployNftContract';

function DeployPage() {
  const [nftName, handleNameChange] = useState('');
  const [nftSymbol, handleSymbolChange] = useState('');
  const [nftMintPrice, handleMintPriceChange] = useState('');
  const [nftLimit, handleLimitChange] = useState('');

  const handleDeploy = () => {
    console.log('deploy');
  };

  return (
    <DeployNftContract
      nftName={nftName}
      handleNameChange={handleNameChange}
      nftSymbol={nftSymbol}
      handleSymbolChange={handleSymbolChange}
      nftMintPrice={nftMintPrice}
      handleMintPriceChange={handleMintPriceChange}
      nftLimit={nftLimit}
      handleLimitChange={handleLimitChange}
      handleDeploy={handleDeploy}
    />
  );
}

export default DeployPage;
