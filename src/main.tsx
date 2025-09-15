import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import '@rainbow-me/rainbowkit/styles.css';
import {
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { config } from './config/config.ts';

import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import './index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <App/>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>

  </StrictMode>
);
