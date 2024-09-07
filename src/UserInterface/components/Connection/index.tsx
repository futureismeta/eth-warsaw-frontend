import React from 'react'
import { Avatar, Box, Button, Typography } from '@mui/material'
import { AccountBalanceWallet as WalletIcon } from '@mui/icons-material'
import { useAccount } from 'wagmi'
import { AlephZeroLogo } from '../../images' // Assuming you have this
import { usePopup } from '../../core/hooks/usePopup'
import { ConnectWallet } from "./ConnectWallet" // Assuming you have your PopupContext

export const Connection = () => {
    const { isConnected } = useAccount()
    const { openPopup } = usePopup()

    const handleOpen = () => {
        openPopup(<ConnectWallet />, isConnected ? 'Manage Wallet' : 'Connect Wallet')
    }

    return (
        <Box sx={{ position: 'absolute', top: 16, left: 16, pointerEvents: 'auto' }}>
            <Button
                variant="outlined"
                onClick={handleOpen}
                sx={{
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                }}
            >
                {isConnected ? (
                    <>
                        <Avatar sx={{ width: 24, height: 24 }}>
                            <AlephZeroLogo style={{ width: '100%', height: '100%' }} />
                        </Avatar>
                        <Typography variant="body2">Connected</Typography>
                    </>
                ) : (
                    <>
                        <Avatar sx={{ width: 24, height: 24, bgcolor: 'primary.main' }}>
                            <WalletIcon sx={{ fontSize: 16 }} />
                        </Avatar>
                        <Typography variant="body2">Connect Wallet</Typography>
                    </>
                )}
            </Button>
        </Box>
    )
}