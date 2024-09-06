import React, {useState} from 'react';
import {Box, Button, Card, Fade, Typography} from '@mui/material';
import {styled} from '@mui/system';
import {AccountBalanceWallet as WalletIcon} from '@mui/icons-material';
import {AlephZeroLogo} from "../../images";

const FullPageContainer = styled(Box)(() => ({
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(10px)',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 9999,
}));

const ContentCard = styled(Card)(({ theme }) => ({
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(10px)',
    padding: theme.spacing(4),
    maxWidth: '800px',
    width: '90%',
    color: theme.palette.common.white,
    border: '1px solid rgba(255, 255, 255, 0.2)',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
        maxWidth: '95%',
    },
}));

const SplashButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    color: theme.palette.common.white,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
}));

export const SplashScreen: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);

    const handleGetStarted = () => {
        // Fade out the splash screen
        setIsVisible(false);
    };

    const handleCreateWallet = () => {
        // Open a confirmation dialog
        window.open('https://rabby.io', '_blank');
    };

    if (!isVisible) {
        return null; // Don't render the splash screen if it's not visible
    }

    return (
        <Fade in={isVisible}>
            <FullPageContainer>
                <ContentCard>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                        <AlephZeroLogo
                            style={{
                                width: '100px',
                                height: '100px',
                            }}
                        />
                    </Box>
                    <Typography variant="h4" align="center" gutterBottom>
                        Welcome to the Aleph Zero Web3 Experience
                    </Typography>
                    <Typography variant="body1" align="center" sx={{ mb: 2 }}>
                        Embark on an educational journey into the world of Aleph Zero, a high-performance blockchain platform
                        with a focus on privacy and scalability.
                    </Typography>
                    <Typography variant="body1" align="center" sx={{ mb: 2 }}>
                        Learn about Aleph Zero's unique consensus mechanism, explore staking opportunities, and discover how
                        to contribute to the network's security and growth.
                    </Typography>
                    <Typography variant="body1" align="center" sx={{ mb: 3 }}>
                        You'll need a Web3 wallet to interact with the Aleph Zero network. If you don't have one, you can
                        create a wallet using supported providers.
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                        <SplashButton
                            variant="outlined"
                            onClick={handleGetStarted}
                            aria-label="Get Started"
                        >
                            Get Started
                        </SplashButton>
                        <SplashButton
                            variant="outlined"
                            startIcon={<WalletIcon />}
                            onClick={handleCreateWallet}
                            aria-label="Create Wallet"
                        >
                            Create Wallet
                        </SplashButton>
                    </Box>
                </ContentCard>
            </FullPageContainer>
        </Fade>
    );
};

export default SplashScreen;
