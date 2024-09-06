import {formatUnits} from 'viem';

export type Balance = {
    decimals: number;
    formatted: string;
    raw: bigint;
}

export const defaultBalance: Balance = {
    decimals: 18,
    formatted: '0',
    raw: 0n
}

export function formatBalance(balance: bigint, decimals = 18): Balance {
    return {
        decimals,
        formatted: formatUnits(balance, decimals),
        raw: balance
    };
}

export const truncateBalance = (balance: Balance, precision = 4) => {
    const formattedBalance = formatUnits(balance.raw, balance.decimals);
    const parts = formattedBalance.split('.');

    if (parts.length === 1 || precision === 0) {
        return parts[0];
    }

    const truncatedDecimal = parts[1].substring(0, precision);
    return `${parts[0]}.${truncatedDecimal}`;
};