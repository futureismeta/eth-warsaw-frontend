import {chains, defaultChain} from "../config/chains";

/**
 * Gets the chain configuration by chain ID.
 * If the chain is not supported, return the default configuration.
 */
export const getChainConfig = (chainId: number | null) => {
    if (chainId && chains[chainId]) {
        return chains[chainId];
    }
    return defaultChain; // Fallback to default chain if not recognized
};
