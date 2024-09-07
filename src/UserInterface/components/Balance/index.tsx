import React, {useCallback} from 'react';
import {Box, CardContent, List, ListItem, ListItemText, Typography} from '@mui/material';
import {MonetizationOn as CoinsIcon} from '@mui/icons-material';
import {TransparentCard} from "../General/TransparentCard";
import {useAlephZero} from "../../core/hooks/Crypto/useAlephZero";
import {StyledButton} from "../General/StyledButton";
import {usePopup} from "../../core/hooks/usePopup";

export const Balance = () => {
    const {alephZeroBalance} = useAlephZero();

    const {openPopup} = usePopup();

    const handleClick = useCallback(() => {
        openPopup(<div>Coming Soon</div>, 'Top Up');
    }, [openPopup])

    return (
        <Box sx={{position: 'absolute', bottom: 16, right: 16, pointerEvents: 'auto'}} onClick={handleClick}>
            <TransparentCard>
                <CardContent>
                    <Typography variant="h6" sx={{display: 'flex', alignItems: 'center', mb: 1}}>
                        <CoinsIcon sx={{mr: 1}}/> Balances
                    </Typography>
                    <List dense>
                        <ListItem>
                            <ListItemText
                                primary={`ZERO: ${alephZeroBalance.formatted.toString()}`}
                                primaryTypographyProps={{component: 'span'}}
                            />
                        </ListItem>
                    </List>
                    <StyledButton
                        variant="outlined"
                        onClick={handleClick}
                    >Top Up</StyledButton>
                </CardContent>
            </TransparentCard>
        </Box>
    );
};