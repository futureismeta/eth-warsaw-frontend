import {useState, useCallback} from 'react';

export interface Quest {
    id: string;
    title: string;
    isCompleted: boolean;
}

//
// const initialQuestList: Quest[] = [
//     { id: 'box_celo', title: 'Find the Celo Box', isCompleted: false },
//     { id: 'box_aleph_zero', title: 'Find the Aleph Zero Box', isCompleted: false },
//     { id: 'box_arweave', title: 'Find the Arweave Box', isCompleted: false },
//     { id: 'box_ora', title: 'Find the Ora Box', isCompleted: false },
//     { id: 'box_worldcoin', title: 'Find the WorldCoin Box', isCompleted: false },
//     { id: 'box_ethwarsaw', title: 'Find the EthWarsaw Box', isCompleted: false },
//     { id: 'box_future_meta', title: 'Find the Future is Meta Box', isCompleted: false },
//     { id: 'box_mantle', title: 'Find the Mantle Box', isCompleted: false },
// ];


const initialQuestList: Quest =
    {id: 'box_mermaid', title: 'Meet the Mermaid', isCompleted: false}


export const useQuests = () => {
    const [quests, setQuests] = useState<Quest>(() => initialQuestList);

    // Method to update a quest's completion status by ID
    const updateQuestStatus = useCallback((isCompleted: boolean) => {
        setQuests((prevQuest) => ({
            ...prevQuest,
            isCompleted,
        }));
    }, []);

    console.log(quests)

    return {quests, updateQuestStatus};
};
