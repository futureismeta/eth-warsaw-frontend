import React from 'react';
import {Box, CardContent, List, ListItem, ListItemText, Typography} from '@mui/material';
import {MonetizationOn as CoinsIcon} from '@mui/icons-material';
import {TransparentCard} from "../General/TransparentCard";

export const Balance = () => {

    return (
        <Box sx={{position: 'absolute', bottom: 16, right: 16, pointerEvents: 'auto'}}>
            <TransparentCard>
                <CardContent>
                    <Typography variant="h6" sx={{display: 'flex', alignItems: 'center', mb: 1}}>
                        <CoinsIcon sx={{mr: 1}}/> Balances
                    </Typography>
                    <List dense>
                        <ListItem>
                            <ListItemText primary="BTC" secondary="0.0025"
                                          secondaryTypographyProps={{component: 'span'}}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="ETH" secondary="0.15"
                                          secondaryTypographyProps={{component: 'span'}}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="DOGE" secondary="1000"
                                          secondaryTypographyProps={{component: 'span'}}/>
                        </ListItem>
                    </List>
                </CardContent>
            </TransparentCard>
        </Box>
    );
}