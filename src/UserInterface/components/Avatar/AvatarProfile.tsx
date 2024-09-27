import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import { styled } from "@mui/system";
import { Assignment as QuestIcon, EmojiEvents as AchievementIcon } from '@mui/icons-material';

const StyledTab = styled(Tab)(({theme}) => ({
    color: theme.palette.common.white,
    '&.Mui-selected': {
        color: theme.palette.primary.main,
    },
}));

interface Quest {
    id: number;
    title: string;
    description: string;
    reward: number;
}

interface Achievement {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

interface ProfilePopupProps {
    quests: Quest[];
    achievements: Achievement[];
}

const ProfilePopup: React.FC<ProfilePopupProps> = ({ quests, achievements }) => {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <div sx={{ width: '100%' }}>
            <Tabs value={tabValue} onChange={handleTabChange} centered sx={{ width: '100%', mb: 2 }}>
                <StyledTab icon={<QuestIcon />} label="Quests" />
                <StyledTab icon={<AchievementIcon />} label="Achievements" />
            </Tabs>
            <Box sx={{ mt: 2, width: '100%', maxHeight: '60vh', overflowY: 'auto' }}>
                {tabValue === 0 && (
                    <Box>
                        {quests.map((quest) => (
                            <Box key={quest.id} sx={{ mb: 2, p: 2, border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: 1 }}>
                                <Typography variant="subtitle1">{quest.title}</Typography>
                                <Typography variant="body2">{quest.description}</Typography>
                                <Typography variant="body2" sx={{ mt: 1, color: 'primary.main' }}>
                                    Reward: {quest.reward} XP
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                )}
                {tabValue === 1 && (
                    <Box>
                        {achievements.map((achievement) => (
                            <Box key={achievement.id} sx={{ mb: 2, p: 2, border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: 1 }}>
                                <Typography variant="subtitle1">{achievement.title}</Typography>
                                <Typography variant="body2">{achievement.description}</Typography>
                                <Typography variant="body2" sx={{ mt: 1, color: achievement.completed ? 'success.main' : 'text.secondary' }}>
                                    {achievement.completed ? 'Completed' : 'Not Completed'}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                )}
            </Box>
        </div>
    );
};

export default ProfilePopup;