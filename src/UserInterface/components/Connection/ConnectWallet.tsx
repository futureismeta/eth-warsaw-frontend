import React, {useEffect, useState} from 'react'
import {Box, Typography} from '@mui/material'
import {StyledButton} from '../General/StyledButton'
import {connect, disconnect, getAccount, switchChain} from '@wagmi/core'
import {injected} from '@wagmi/connectors'
import cryptoConfig from '../../config/config'
import {celo, mantle} from "@wagmi/core/chains"
import {AlephZero} from "../../config/alephzero"

const networks = [
    {name: 'Mantle', id: mantle.id},
    {name: 'Aleph Zero', id: AlephZero.id},
    {name: 'Celo', id: celo.id}
]

export const ConnectWallet = () => {
    const [isConnected, setIsConnected] = useState(false)
    const [currentNetwork, setCurrentNetwork] = useState<number | null>(null)

    useEffect(() => {
        const account = getAccount(cryptoConfig)
        setIsConnected(account.isConnected)
        setCurrentNetwork(account.chainId)
    }, [])

    const handleConnect = async (networkId: number) => {
        try {
            await connect(cryptoConfig, {connector: injected()})
            await switchChain(cryptoConfig, {chainId: networkId})
            setIsConnected(true)
        } catch (error) {
            console.error("Failed to connect or switch chain:", error)
        }
    }

    const handleDisconnect = async () => {
        try {
            await disconnect(cryptoConfig)
            setIsConnected(false)
        } catch (error) {
            console.error("Failed to disconnect:", error)
        }
    }

    const handleSwitchChain = async (networkId: number) => {
        try {
            await switchChain(cryptoConfig, {chainId: networkId})
            setCurrentNetwork(networkId)
        } catch (error) {
            console.error("Failed to switch chain:", error)
        }
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
            <Typography variant="body2" gutterBottom>
                {isConnected ? 'Switch to a different network:' : 'Choose a network to connect to:'}
            </Typography>
            {networks.map((network) => (
                <StyledButton
                    key={network.id}
                    variant="outlined"
                    onClick={() => isConnected ? handleSwitchChain(network.id) : handleConnect(network.id)}
                    disabled={isConnected && currentNetwork === network.id}
                >
                    {isConnected ? `Switch to ${network.name}` : `Connect to ${network.name}`}
                </StyledButton>
            ))}
            {isConnected && (
                <StyledButton
                    onClick={handleDisconnect}
                >
                    Disconnect
                </StyledButton>
            )}
        </Box>
    )
}