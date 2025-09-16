import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'viem';
import {
  liskSepolia
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [liskSepolia],
  transports: {[liskSepolia.id]: http("https://rpc.sepolia-api.lisk.com")},
  ssr: true, 
});