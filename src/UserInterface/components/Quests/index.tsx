import React, {useCallback, useState} from 'react';
import {Box, CardContent, IconButton, List, Typography} from '@mui/material';
import {EmojiEvents as TrophyIcon, ExpandLess, ExpandMore} from '@mui/icons-material';
import {TransparentCard} from "../General/TransparentCard";
import {styled} from "@mui/system";
import {useQuests} from '../../core/hooks/Quests/useQuests';
import {Quest} from "./Quest";


const QuestList = styled(List)(() => ({
    maxHeight: '300px',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-track': {
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
        background: 'rgba(255, 255, 255, 0.3)',
        borderRadius: '4px',
        '&:hover': {
            background: 'rgba(255, 255, 255, 0.5)',
        },
    },
}));


export const Quests = () => {
    const {quests} = useQuests();
    const [minimized, setMinimized] = useState(false);

    const toggleMinimized = useCallback(() => {
        setMinimized(prev => !prev);
    }, []);

    console.log("Quests", quests)

    return (
        <Box sx={{position: 'absolute', top: 16, right: 16, pointerEvents: 'auto'}}>
            <TransparentCard sx={{width: 350, overflow: 'hidden'}}>
                <CardContent sx={{padding: 2}}>
                    <Typography variant="h6" sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2,
                        fontWeight: 'bold'
                    }}>
                        <TrophyIcon sx={{mr: 1}} aria-hidden="true"/> Quests
                        <IconButton
                            sx={{ml: 'auto'}}
                            onClick={toggleMinimized}
                            aria-label={minimized ? "Expand quests" : "Minimize quests"}
                        >
                            {minimized ? <ExpandMore/> : <ExpandLess/>}
                        </IconButton>
                    </Typography>
                    <Box sx={{
                        maxHeight: minimized ? 0 : '300px',
                        transition: 'max-height 0.3s ease-in-out',
                        overflow: 'hidden',
                    }}>
                        <QuestList>
                            <Quest quest={quests}/>
                        </QuestList>
                    </Box>
                </CardContent>
            </TransparentCard>
        </Box>
    );
};