import React from 'react';
import {Box, CardContent, List, ListItem, ListItemText, Typography} from '@mui/material';
import {MonetizationOn as CoinsIcon} from '@mui/icons-material';
import {TransparentCard} from "../General/TransparentCard";
import {useAlephZero} from "../../core/hooks/Crypto/useAlephZero";

export const Balance = () => {

    const {alephZeroBalance} = useAlephZero()

    return (
        <Box sx={{position: 'absolute', bottom: 16, right: 16, pointerEvents: 'auto'}}>
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
                </CardContent>
            </TransparentCard>
        </Box>
    );
}