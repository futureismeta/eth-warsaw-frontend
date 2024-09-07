interface ChainConfig {
    name: string;
    banxaUrl: string;
}

export const chains: { [key: number]: ChainConfig } = {
    42220: {
        name: "Celo",
        banxaUrl: "https://celo.banxa.com/?fiatType=USD&blockchain=CELO",
    },
    122: {
        name: "Aleph Zero",
        banxaUrl: "https://banxa.com/?fiatType=USD&blockchain=ALEPH",
    },
    5000: {
        name: "Mantle",
        banxaUrl: "https://banxa.com/?fiatType=USD&blockchain=MANTLE",
    },
};

export const defaultChain: ChainConfig = {
    name: "Ethereum",
    banxaUrl: "https://banxa.com/?fiatType=USD&blockchain=ETH",
};