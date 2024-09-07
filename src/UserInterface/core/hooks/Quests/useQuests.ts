import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useAlephZero } from '../Crypto/useAlephZero';


export interface Quest {
    title: string;
    xp: number;
    isCompleted: boolean;
}

export const useQuests = () => {
    const { address } = useAccount(); // Wagmi hook to check wallet connection
    const { alephZeroBalance } = useAlephZero(); // Hook to get Aleph Zero balance
    const [quests, setQuests] = useState([
        { title: 'Connect your wallet', xp: 100, isCompleted: false },
        { title: 'Hold 10 ZERO', xp: 250, isCompleted: false },
        { title: 'Perform a swap', xp: 500, isCompleted: false },
    ]);

    useEffect(() => {
        // Update quest status based on conditions
        setQuests(prevQuests => prevQuests.map(quest => {
            if (quest.title === 'Connect your wallet') {
                return {
                    ...quest,
                    isCompleted: !!address, // Completed if wallet is connected
                };
            }
            if (quest.title === 'Hold 10 ZERO') {
                return {
                    ...quest,
                    isCompleted: alephZeroBalance.decimals >= 10, // Completed if balance is >= 10 ZERO
                };
            }
            // You can add more conditions for other quests like 'Perform a swap'
            return quest;
        }));
    }, [address, alephZeroBalance]); // Re-run the check when balance or address changes

    return { quests };
};
