import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { WalletProvider } from './WalletProvider';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <WalletProvider>
    <App />
  </WalletProvider>
);
