import React from 'react';
import {Connection} from './features/Connection';
import GlobalPopup from './components/Popup';
import useWebSocket from './core/hooks/useWebSocket';

export const UserInterfaceComponent = () => {
    const {status} = useWebSocket();

    if (status === 'disconnected') {
        return null;
    }

    return (
        <div>
            <Connection/>
            <GlobalPopup/>
        </div>
    );
};

export default UserInterfaceComponent;
