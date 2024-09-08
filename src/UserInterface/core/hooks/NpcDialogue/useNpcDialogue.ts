import { useState, useEffect } from 'react';

export const useNpcDialogue = () => {
    const [npcMessages, setNpcMessages] = useState([]);

    useEffect(() => {
        // Simulate fetching dialogue messages (can be replaced with API call)
        const fetchNpcMessages = () => {
            return [
                "Welcome to the Eth Warsaw 2024 virtual conference! Explore our amazing sponsors and learn about all the innovation in the Web3 World",
                "Explore the beautifully crafted space and engage with different blockchains as you explore. Don't forget to meet Warsaw's famous Mermaid and collect a unique prize!",
            ];
        };

        // Set fetched messages
        const messages = fetchNpcMessages();
        setNpcMessages(messages);
    }, []);

    return npcMessages;
};
