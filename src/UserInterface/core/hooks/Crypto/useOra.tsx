import {useCallback} from 'react';
import {useWriteContract} from 'wagmi';
import {Addresses} from '../../../config/addresses';
import {getAddress} from 'viem';
import Ora from '../../../config/contracts/abi/ora/prompt.json';

export const usePrompt = () => {
    const {writeContract} = useWriteContract();

    const prompt = useCallback(async (message: string) => {
            try {
                return writeContract({
                    abi: Ora,
                    address: getAddress(Addresses.mantle.ora.prompt),
                    functionName: 'calculateAIResult',
                    value: 3.0001,
                    args: [11, message],
                });
            } catch (e) {
                console.error(e);
            }
        },
        [writeContract]
    );

    return {prompt};
};