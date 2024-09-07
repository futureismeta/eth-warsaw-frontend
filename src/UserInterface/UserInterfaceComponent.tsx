import React from 'react';
import {Connection} from './components/Connection';
import useWebSocket from './core/hooks/useWebSocket';
import {Balance} from "./components/Balance";
import {NpcDialogue} from "./components/NpcDialogue";
import {Quests} from "./components/Quests";

export const UserInterfaceComponent = () => {
    const {status} = useWebSocket();

    if (status === 'disconnected') {
        return null;
    }

    return (
        <div>
            <Connection/>
            <Balance/>
            {/*<AirdropClaim/>*/}
            <NpcDialogue/>
            {/*<SplashScreen/>*/}
            <Quests/>
        </div>
    );
};
