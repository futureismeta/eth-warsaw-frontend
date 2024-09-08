import React from 'react';
import {Connection} from './components/Connection';
import useWebSocket from './core/hooks/useWebSocket';
import {Balance} from "./components/Balance";
import {NpcDialogue} from "./components/NpcDialogue";
import {Quests} from "./components/Quests";
import SplashScreen from "./components/SplashScreen";

const MemoQuest = React.memo(() => {
    return <Quests />;
});

export const UserInterfaceComponent = () => {
    const {status} = useWebSocket();

    // Handle disconnected status with a minimal UI instead of returning null
    if (status === 'disconnected') {
        return <div>WebSocket is disconnected. Please wait...</div>;
    }

    return (
        <div>
            <Connection/>
            <Balance/>
            <NpcDialogue/>
            <SplashScreen/>
            <MemoQuest/>
        </div>
    );
};
