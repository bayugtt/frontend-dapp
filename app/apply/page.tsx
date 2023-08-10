'use client'

import Apply from './app';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  baseGoerli,
  mainnet,

} from 'wagmi/chains';

import { publicProvider } from 'wagmi/providers/public';


const { chains, publicClient } = configureChains(
  [mainnet, baseGoerli],
  [
    publicProvider()
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'DIGIBASE',
  projectId: '96ab49311472829887a0342f28a33171',
  chains
});
const wagmiConfig = createConfig({
  autoConnect: false,
  connectors,
  publicClient
})



// Pass config to React Context Provider
function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider modalSize="compact" initialChain={baseGoerli} chains={chains} >
       <Apply />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
export default App;