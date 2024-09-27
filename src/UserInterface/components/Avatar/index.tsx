import React from 'react';
import { Box, Typography, Avatar, LinearProgress } from '@mui/material';
import { styled } from '@mui/system';
import { usePopup } from "../../core/hooks/usePopup";
import AvatarProfile from './AvatarProfile';

const AvatarContainer = styled(Box)(({theme}) => ({
    position: 'absolute',
    top: 16,
    left: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    cursor: 'pointer',
}));

const StyledAvatar = styled(Avatar)(({theme}) => ({
    width: 80,
    height: 80,
    border: '2px solid rgba(255, 255, 255, 0.8)',
}));

const LevelText = styled(Typography)(({theme}) => ({
    color: theme.palette.common.white,
    marginTop: theme.spacing(1),
    fontWeight: 'bold',
}));

const XPText = styled(Typography)(({theme}) => ({
    color: theme.palette.common.white,
    fontSize: '0.8rem',
    marginTop: theme.spacing(0.5),
}));

const XPProgress = styled(LinearProgress)(({theme}) => ({
    width: '100%',
    marginTop: theme.spacing(1),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    '& .MuiLinearProgress-bar': {
        backgroundColor: theme.palette.primary.main,
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

interface AvatarSectionProps {
    avatarUrl: string;
    level: number;
    currentXP: number;
    nextLevelXP: number;
    quests: Quest[];
    achievements: Achievement[];
}

export default function AvatarSection({
                                          avatarUrl,
                                          level,
                                          currentXP,
                                          nextLevelXP,
                                          quests,
                                          achievements
                                      }: AvatarSectionProps) {
    const { openPopup } = usePopup();
    const progress = (currentXP / nextLevelXP) * 100;

    const handleOpen = () => {
        openPopup(
            <AvatarProfile
                quests={quests}
                achievements={achievements}
            />,
            'Player Profile'
        );
    };

    return (
        <AvatarContainer onClick={handleOpen}>
            <StyledAvatar src={avatarUrl} alt="User Avatar"/>
            <LevelText variant="h6">Level {level}</LevelText>
            <XPText>
                {currentXP}/{nextLevelXP} XP
            </XPText>
            <XPProgress variant="determinate" value={progress}/>
        </AvatarContainer>
    );
}