import { createConfig, http } from '@wagmi/core';
import { mainnet } from '@wagmi/core/chains';
import { walletConnect } from '@wagmi/connectors';

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}

const cryptoConfig = createConfig({
  chains: [mainnet],
  connectors: [
    walletConnect({
      projectId: '',
    }),
  ],
  transports: {
    [mainnet.id]: http(),
  },
});

export default cryptoConfig;
