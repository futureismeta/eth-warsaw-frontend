import { useState } from 'react';

// Custom hook to manage quest data
export const useQuests = () => {
    const [quests] = useState([
        { title: 'Defeat the Dragon', xp: 500 },
        { title: 'Collect 100 Coins', xp: 200 },
        { title: 'Explore the Cave', xp: 300 },
    ]);

    return { quests };
};
