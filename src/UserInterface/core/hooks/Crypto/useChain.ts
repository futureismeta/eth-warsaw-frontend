import { useState, useEffect } from 'react';
import { getAccount } from '@wagmi/core';
import {getChainConfig} from "../../../utils/chainUtils";
import cryptoConfig from "../../../config/config";

interface ChainData {
    chainId: number | null;
    name: string;
    banxaUrl: string;
}

/**
 * Custom hook to get and store the current chain data.
 * Returns chain configuration including chain ID, name, and Banxa URL.
 */
export const useChainConfig = () => {
    const [chainData, setChainData] = useState<ChainData>({
        chainId: null,
        name: '',
        banxaUrl: '',
    });

    useEffect(() => {
        // Fetch account details using Wagmi to get the current chain ID
        const account = getAccount(cryptoConfig);

        // Fetch the chain configuration based on the current chain ID
        const chainConfig = getChainConfig(account.chainId);

        // Store the chain data in the state
        setChainData({
            chainId: account.chainId,
            name: chainConfig.name
        });
    }, []);

    return chainData; // Return the chain data (chain ID, name, banxaUrl)
};
