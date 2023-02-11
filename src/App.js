import { useAddress, ConnectWallet, useContract, useNFTBalance, Web3Button } from '@thirdweb-dev/react';
import { useState, useEffect, useMemo } from 'react';

const App = () => {
  /// Use the hooks thirdweb give us.
  const address = useAddress();
  console.log("👋 Address:", address);
  // Initialize our Edition Drop contract
  const editionDropAddress = "0x485CEE21DC10927E194E0716533Be54E89428eA2";
  const { contract: editionDrop } = useContract(editionDropAddress, "edition-drop");
  // Hook to check if the user has our NFT
  const { data: nftBalance } = useNFTBalance(editionDrop, address, "0")

  const hasClaimedNFT = useMemo(() => {
    return nftBalance && nftBalance.gt(0)
  }, [nftBalance])


  // ... include all your other code that was already there below.

  // This is the case where the user hasn't connected their wallet
  // to your web app. Let them call connectWallet.
  if (!address) {
    return (
      <div className="landing">
        <h1>Welcome to AOT-DAO</h1>
        <div className="btn-hero">
          <ConnectWallet />
        </div>
      </div>
    );
  }
  if (hasClaimedNFT) {
    return (
      <div className="member-page">
        <h1>AOT-DAO Member Page</h1>
        <p>Congratulations on being a member</p>
      </div>
    );
  };

  // This is the case where we have the user's address
  // which means they've connected their wallet to our site!
  return (
    <div className="mint-nft">
      <h1>Mint your free AOT-DAO Membership NFT</h1>
      <div className="btn-hero">
        <Web3Button
          contractAddress={editionDropAddress}
          action={contract => {
            contract.erc1155.claim(0, 1)
          }}
          onSuccess={() => {
            console.log(`🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`);
          }}
          onError={error => {
            console.error("Failed to mint NFT", error);
          }}
        >
          Mint your NFT (FREE)
        </Web3Button>
      </div>
    </div>
  );
}

export default App;