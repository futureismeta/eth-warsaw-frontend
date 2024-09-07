import { useState, useEffect } from 'react';

export const useNpcDialogue = () => {
    const [npcMessages, setNpcMessages] = useState([]);

    useEffect(() => {
        // Simulate fetching dialogue messages (can be replaced with API call)
        const fetchNpcMessages = () => {
            return [
                "Welcome to the Eth Warsaw 2024 virtual conference.",
                "Powered by Aleph Zero and hosted by Arweave, this event showcases the latest innovations in blockchain technology.",
            ];
        };

        // Set fetched messages
        const messages = fetchNpcMessages();
        setNpcMessages(messages);
    }, []);

    return npcMessages;
};
