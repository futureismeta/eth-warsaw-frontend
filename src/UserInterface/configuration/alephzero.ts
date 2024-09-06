import {defineChain} from "viem";

export const AlephZero = /*#__PURE__*/ defineChain({
    id: 2039, // Update the ID for Aleph Zero
    name: 'Aleph Zero',
    nativeCurrency: {name: 'Aleph', symbol: 'TZERO', decimals: 18},
    rpcUrls: {
        default: {
            http: ['https://rpc.alephzero-testnet.gelato.digital'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Aleph Zero Explorer',
            url: 'https://infotestnet.alephzero.org', // Example block explorer URL
            apiUrl: 'https://infotestnet.alephzero.org/api', // Example API URL for the explorer
        },
    },
    contracts: {
        ensRegistry: {
            address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e', // This may need to be updated based on Aleph Zero's contracts
        },
        ensUniversalResolver: {
            address: '0xce01f8eee7E479C928F8919abD53E553a36CeF67', // Update as necessary
            blockCreated: 0, // Update block number if applicable
        },
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11', // Update as necessary
            blockCreated: 0, // Update block number if applicable
        },
    },
})