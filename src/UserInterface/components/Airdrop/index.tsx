import React, {useState} from 'react'
import {Box, Snackbar, Typography} from '@mui/material'
import {IDKitWidget, VerificationLevel,} from '@worldcoin/idkit'
import {PopupCard} from "../General/PopupCard";
import { StyledButton } from '../General/StyledButton';

export const AirdropClaim = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [claimingToken, setClaimingToken] = useState<string | null>(null)
    const [showSnackbar, setShowSnackbar] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')

    const handleVerify = async (proof: any) => {
        // Here you would verify the proof with your backend
        console.log("Proof received:", proof)
        setIsLoggedIn(true)
    }

    const handleClaim = async (token: string) => {
        setClaimingToken(token)
        // Simulate API call to claim tokens
        await new Promise(resolve => setTimeout(resolve, 2000))
        setClaimingToken(null)
        setSnackbarMessage(`Successfully claimed ${token} tokens!`)
        setShowSnackbar(true)
    }

    return (
        <PopupCard>
            <Typography variant="h4" component="h1" gutterBottom>
                Airdrop Claim
            </Typography>

            {!isLoggedIn ? (
                <Box width="100%">
                    <Typography variant="body1" gutterBottom>
                        Please verify with Worldcoin to claim your airdrop tokens.
                    </Typography>
                    <IDKitWidget
                        app_id="app_staging_40fd28bd2c7a2d75d306ec4c93e2245b" // obtained from the Developer Portal
                        action="verify-human" // this is your action id from the Developer Portal
                        onSuccess={() => {}} // callback when the modal is closed
                        handleVerify={handleVerify} // optional callback when the proof is received
                        verification_level={VerificationLevel.Device}
                    >
                        {({ open }) => (
                            <StyledButton
                                variant="outlined"
                                onClick={open}
                                // startIcon={<WorldcoinIcon />}
                            >
                                Verify with Worldcoin
                            </StyledButton>
                        )}
                    </IDKitWidget>
                </Box>
            ) : (
                <>
                    <Typography variant="body1" gutterBottom>
                        You're verified! Claim your airdrop tokens below.
                    </Typography>
                    <StyledButton
                        variant="outlined"
                        onClick={() => handleClaim('Aleph Zero')}
                        disabled={!!claimingToken}
                        // startIcon={claimingToken === 'Aleph Zero' ? <CircularProgress size={20} /> : <AlephIcon />}
                    >
                        {claimingToken === 'Aleph Zero' ? 'Claiming...' : 'Claim Aleph Zero'}
                    </StyledButton>
                    <StyledButton
                        variant="outlined"
                        onClick={() => handleClaim('Celo')}
                        disabled={!!claimingToken}
                        // startIcon={claimingToken === 'Celo' ? <CircularProgress size={20} /> : <CeloIcon />}
                    >
                        {claimingToken === 'Celo' ? 'Claiming...' : 'Claim Celo'}
                    </StyledButton>
                </>
            )}

            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={showSnackbar}
                autoHideDuration={6000}
                onClose={() => setShowSnackbar(false)}
                message={snackbarMessage}
            />
        </PopupCard>
    )
}