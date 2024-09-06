import { createConfig, http } from '@wagmi/core';
import { mainnet } from '@wagmi/core/chains';
import { walletConnect } from '@wagmi/connectors';
import {AlephZero} from "./alephzero";

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}

const cryptoConfig = createConfig({
  chains: [mainnet, AlephZero],
  connectors: [
    walletConnect({
      projectId: '0e0b7feb70fcc200b2cc9a8beeb6863c',
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [AlephZero.id]: http(),
  },
});

export default cryptoConfig;
