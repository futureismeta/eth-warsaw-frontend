import React, { useState } from 'react';
import { Box, CardContent, Chip, List, ListItem, ListItemText, Typography, IconButton } from '@mui/material';
import { EmojiEvents as SwordIcon, ExpandLess, ExpandMore } from '@mui/icons-material';
import { TransparentCard } from "../General/TransparentCard";
import { styled } from "@mui/system";
import { useQuests } from '../../core/hooks/Quests/useQuests';

const XPChip = styled(Chip)(({ theme }) => ({
    backgroundColor: 'rgba(76, 175, 80, 0.7)',
    color: theme.palette.common.white,
}));

export const Quests = () => {
    const [minimized, setMinimized] = useState(false);
    const { quests } = useQuests();

    return (
        <Box sx={{ position: 'absolute', top: 16, right: 16, pointerEvents: 'auto' }}>
            <TransparentCard sx={{ width: 250 }}>
                <CardContent>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <SwordIcon sx={{ mr: 1 }} /> Quests
                        <IconButton
                            sx={{ ml: 'auto' }}
                            onClick={() => setMinimized(!minimized)}
                        >
                            {minimized ? <ExpandMore /> : <ExpandLess />}
                        </IconButton>
                    </Typography>
                    {!minimized && (
                        <List dense>
                            {quests.map((quest, index) => (
                                <ListItem key={index} secondaryAction={<XPChip label={`${quest.xp} XP`} size="small" />}>
                                    <ListItemText primary={quest.title} />
                                </ListItem>
                            ))}
                        </List>
                    )}
                </CardContent>
            </TransparentCard>
        </Box>
    );
};
