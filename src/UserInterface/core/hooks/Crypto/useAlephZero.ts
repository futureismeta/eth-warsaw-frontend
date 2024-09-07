import {useEffect, useState} from 'react';
import {useAccount, useBalance} from 'wagmi';
import {defaultBalance, formatBalance} from "../../../utils/balances";

export const useAlephZero = () => {
    const { address } = useAccount();
    const [alephZeroBalance, setAlephZeroBalance] = useState(defaultBalance);

    const { data, isLoading, isError } = useBalance({
        address: address,
        enabled: !!address,
    });

    useEffect(() => {
        if (!data || !isLoading || !isError) {
            setAlephZeroBalance(formatBalance(data?.value || 0));
        }
    }, [data, isLoading, isError]);

    return {
        alephZeroBalance,
    };
};
