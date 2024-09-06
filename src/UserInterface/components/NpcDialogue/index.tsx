import React, {useEffect, useState} from 'react';
import {Avatar, Box, Button, CardContent, Typography} from '@mui/material';
import {ChevronRight as ChevronRightIcon, Person as UserIcon} from '@mui/icons-material';
import {TransparentCard} from "../General/TransparentCard";

export const NpcDialogue = () => {

    const [showMessage, setShowMessage] = useState(true);
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

    const [npcMessages, setNpcMessages] = useState([
        "Welcome, adventurer! The dragon has been spotted near the eastern mountains.",
        "Beware of the enchanted forest to the north. Many have entered, few have returned.",
        "I've heard rumors of hidden treasure in the abandoned mines. Be careful if you decide to explore!",
        "The local blacksmith is offering a discount on weapon upgrades today. Might be worth a visit!",
        "There's a mysterious portal that appeared in the town square. Nobody knows where it leads..."
    ]);

    const handleNextMessage = () => {
        setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % npcMessages.length);
    };

    useEffect(() => {
        setShowMessage(true);
    }, [currentMessageIndex]);

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
                    <Box sx={{display: 'flex', alignItems: 'flex-start', gap: 2}}>
                        <Avatar sx={{bgcolor: 'primary.main'}}>
                            <UserIcon/>
                        </Avatar>
                        <Box sx={{flexGrow: 1}}>
                            <Typography variant="subtitle1" sx={{fontWeight: 'bold', mb: 1}}>NPC</Typography>
                            <Typography variant="body2" sx={{mb: 2}}>{npcMessages[currentMessageIndex]}</Typography>
                            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    endIcon={<ChevronRightIcon/>}
                                    onClick={handleNextMessage}
                                    sx={{color: 'white', borderColor: 'rgba(255, 255, 255, 0.2)'}}
                                >
                                    Next
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
            </TransparentCard>
        </Box>)
}