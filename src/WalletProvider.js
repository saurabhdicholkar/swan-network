import React, { createContext, useContext, useEffect, useState } from 'react';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [publicKey, setPublicKey] = useState(null);

  useEffect(() => {
    if (window.solana && window.solana.isPhantom) {
      window.solana.connect({ onlyIfTrusted: true }).then(({ publicKey }) => {
        setPublicKey(publicKey.toString());
      }).catch(() => {});
    }
  }, []);

  const connectWallet = async () => {
    if (window.solana) {
      try {
        const response = await window.solana.connect();
        setPublicKey(response.publicKey.toString());
      } catch (err) {
        console.error('Wallet connection error:', err);
      }
    }
  };

  return (
    <WalletContext.Provider value={{ publicKey, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
