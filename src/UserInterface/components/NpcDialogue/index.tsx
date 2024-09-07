import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, CardContent, Typography } from '@mui/material';
import { ChevronRight as ChevronRightIcon, Person as UserIcon } from '@mui/icons-material';
import { TransparentCard } from "../General/TransparentCard";
import { useNpcDialogue } from '../../core/hooks/NpcDialogue/useNpcDialogue';

export const NpcDialogue = () => {
    const npcMessages = useNpcDialogue(); // Fetch the dialogue from the hook
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [showMessage, setShowMessage] = useState(true);
    const [isChatFinished, setIsChatFinished] = useState(false);

    const handleNextMessage = () => {
        if (currentMessageIndex < npcMessages.length - 1) {
            setCurrentMessageIndex(prevIndex => prevIndex + 1);
        } else {
            setIsChatFinished(true); // Mark chat as finished when reaching the end
        }
    };

    useEffect(() => {
        setShowMessage(true);
    }, [currentMessageIndex]);

    if (isChatFinished) {
        return null; // End the chat by not rendering the component when the chat is finished
    }

    return (
        <Box
            sx={{
                position: 'absolute',
                bottom: 16,
                left: '50%',
                transform: 'translateX(-50%)',
                transition: 'opacity 0.5s',
                opacity: showMessage ? 1 : 0,
                pointerEvents: 'auto',
                maxWidth: 1000,
                width: '100%'
            }}
        >
            <TransparentCard>
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                            <UserIcon />
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>NPC</Typography>
                            <Typography variant="body2" sx={{ mb: 2 }}>{npcMessages[currentMessageIndex]}</Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    endIcon={<ChevronRightIcon />}
                                    onClick={handleNextMessage}
                                    sx={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.2)' }}
                                    disabled={isChatFinished} // Disable button when chat is finished
                                >
                                    {currentMessageIndex < npcMessages.length - 1 ? 'Next' : 'Close'}
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
            </TransparentCard>
        </Box>
    );
};
