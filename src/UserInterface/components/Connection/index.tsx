import React from 'react';
import {useAccount} from 'wagmi';
import {connect} from '@wagmi/core';
import cryptoConfig from '../../configuration/config';
import {injected} from '@wagmi/connectors';
import {AlephZero} from "../../images";
import {Avatar, Box, Button} from '@mui/material';
import {AccountBalanceWallet as WalletIcon} from '@mui/icons-material';

export const Connection = () => {
    const { isConnected } = useAccount();

    const handleConnect = async () => {
        try {
            await connect(cryptoConfig, { connector: injected() });
        } catch (error) {
            console.error('Failed to connect:', error);
        }
    };

    const renderButton = () => (
        <Box sx={{ position: 'absolute', top: 16, left: 16, pointerEvents: 'auto' }}>
            <Button
                variant="outlined"
                onClick={handleConnect}
                sx={{
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.8)',
                    paddingLeft: '12px', // Reduce left padding
                }}
                startIcon={
                    <Avatar sx={{ width: 24, height: 24, bgcolor: 'primary.main' }}>
                        <WalletIcon sx={{ fontSize: 16 }} />
                    </Avatar>
                }
            >
                Connect Wallet
            </Button>
        </Box>
    );

    const renderConnected = () => (
        <Box sx={{ position: 'absolute', top: 16, left: 16, pointerEvents: 'auto', display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ width: 40, height: 40, marginRight: 1 }}>
                <AlephZero style={{ width: '100%', height: '100%' }} />
            </Avatar>
            <span style={{ color: 'white' }}>Connected</span>
        </Box>
    );

    return (
        <div>
            {!isConnected ? renderButton() : renderConnected()}
        </div>
    );
};