import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'viem';
import {
  sepolia
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [sepolia],
  transports: {[sepolia.id]: http(import.meta.env.VITE_SEPOLIA_NODE_URL)},
  ssr: true, 
});