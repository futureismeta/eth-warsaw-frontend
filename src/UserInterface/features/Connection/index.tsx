import React from 'react';
import styles from './Connection.module.css';
import {useAccount} from 'wagmi';
import {connect} from '@wagmi/core';
import cryptoConfig from '../../configuration/config';
import {injected} from '@wagmi/connectors';

export const Connection = () => {
    const {isConnected} = useAccount();

    const handleConnect = async () => {
        try {
            await connect(cryptoConfig, {connector: injected()});
        } catch (error) {
            console.error('Failed to connect:', error);
        }
    };

    const renderButton = () => (
        <div className={styles.connection}>
            <button className={styles.connectButton} onClick={handleConnect}>
                Connect
            </button>
        </div>
    );

    const renderConnected = () => (
        <div>
        </div>
    );

    return (
        <div className={styles.connection}>
            {!isConnected ? renderButton() : renderConnected()}
        </div>
    );
};
