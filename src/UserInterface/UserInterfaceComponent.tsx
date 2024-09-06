import React from 'react';
import {Connection} from './components/Connection';
import GlobalPopup from './components/Popup';
import useWebSocket from './core/hooks/useWebSocket';
import {Balance} from "./components/Balance";
import {NpcDialogue} from "./components/NpcDialogue";
import {Quests} from "./components/Quests";
import SplashScreen from "./components/SplashScreen";

export const UserInterfaceComponent = () => {
    const {status} = useWebSocket();

    if (status === 'disconnected') {
        return null;
    }

    return (
        <div>
            <Connection/>
            <Balance/>
            <GlobalPopup/>
            <NpcDialogue/>
            <SplashScreen/>
            <Quests/>
        </div>
    );
};

export default UserInterfaceComponent;
