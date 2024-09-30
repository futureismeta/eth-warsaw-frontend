import React from 'react';
import useWebSocket from './core/hooks/useWebSocket';
import {Balance} from "./components/Balance";
import {NpcDialogue} from "./components/NpcDialogue";
import {Quests} from "./components/Quests";
import SplashScreen from "./components/SplashScreen";
import {Connection} from "./components/Connection";

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
        <div style={{zIndex: 9999}}>
            <Connection/>
            <Balance/>
            <NpcDialogue/>
            {/*<AvatarSection*/}
            {/*    avatarUrl="https://lumiere-a.akamaihd.net/v1/images/a_avatarpandorapedia_jakesully_16x9_1098_02_b13c4171.jpeg"*/}
            {/*    level={1}*/}
            {/*    currentXP={44}*/}
            {/*    nextLevelXP={100}*/}
            {/*    quests={[*/}
            {/*        {*/}
            {/*            id: 1,*/}
            {/*            title: 'Quest 1',*/}
            {/*            description: 'Description 1',*/}
            {/*            reward: 100*/}
            {/*        },*/}
            {/*        {*/}
            {/*            id: 2,*/}
            {/*            title: 'Quest 2',*/}
            {/*            description: 'Description 2',*/}
            {/*            reward: 200*/}
            {/*        }*/}
            {/*    ]}*/}
            {/*    achievements={[*/}
            {/*        {*/}
            {/*            id: 1,*/}
            {/*            title: 'Achievement 1',*/}
            {/*            description: 'Description 1',*/}
            {/*            completed: false*/}
            {/*        },*/}
            {/*        {*/}
            {/*            id: 2,*/}
            {/*            title: 'Achievement 2',*/}
            {/*            description: 'Description 2',*/}
            {/*            completed: true*/}
            {/*        }*/}
            {/*    ]}*/}
            {/*/>*/}
            <SplashScreen/>
            <MemoQuest/>
        </div>
    );
};
