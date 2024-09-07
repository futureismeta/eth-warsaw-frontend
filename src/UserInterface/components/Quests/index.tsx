import React, { useState, useCallback } from 'react'
import { Box, CardContent, Chip, List, ListItem, ListItemText, Typography, IconButton, Tooltip } from '@mui/material'
import { EmojiEvents as TrophyIcon, ExpandLess, ExpandMore, CheckCircle, Cancel } from '@mui/icons-material'
import { TransparentCard } from "../General/TransparentCard"
import { styled } from "@mui/system"
import { useQuests } from '../../core/hooks/Quests/useQuests'

const XPChip = styled(Chip)(({ theme }) => ({
    backgroundColor: 'rgba(76, 175, 80, 0.8)',
    color: theme.palette.common.white,
    fontWeight: 'bold',
    fontSize: '0.75rem',
    height: '24px',
}))

const QuestList = styled(List)(({ theme }) => ({
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
}))

const QuestItem = styled(ListItem)(({ theme }) => ({
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'background-color 0.3s ease',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
}))

const QuestTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
}))

const QuestStatus = styled(Typography)(({ theme, completed }) => ({
    color: completed ? theme.palette.success.light : theme.palette.warning.light,
    fontSize: '0.75rem',
}))

const QuestItemComponent = React.memo(({ quest }) => (
    <QuestItem>
        <ListItemText
            primary={<QuestTitle variant="body1">{quest.title}</QuestTitle>}
            secondary={
                <QuestStatus completed={quest.isCompleted}>
                    {quest.isCompleted ? 'Completed' : 'In Progress'}
                </QuestStatus>
            }
        />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <XPChip label={`${quest.xp} XP`} size="small" />
            <Tooltip title={quest.isCompleted ? 'Quest Completed' : 'Quest In Progress'}>
                {quest.isCompleted ? (
                    <CheckCircle sx={{ color: 'success.light' }} />
                ) : (
                    <Cancel sx={{ color: 'warning.light' }} />
                )}
            </Tooltip>
        </Box>
    </QuestItem>
))

export const Quests = () => {
    const [minimized, setMinimized] = useState(false)
    const { quests } = useQuests()

    const toggleMinimized = useCallback(() => {
        setMinimized(prev => !prev)
    }, [])

    return (
        <Box sx={{ position: 'absolute', top: 16, right: 16, pointerEvents: 'auto' }}>
            <TransparentCard sx={{ width: 350, overflow: 'hidden' }}>
                <CardContent sx={{ padding: 2 }}>
                    <Typography variant="h6" sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2,
                        fontWeight: 'bold'
                    }}>
                        <TrophyIcon sx={{ mr: 1 }} aria-hidden="true" /> Quests
                        <IconButton
                            sx={{ ml: 'auto' }}
                            onClick={toggleMinimized}
                            aria-label={minimized ? "Expand quests" : "Minimize quests"}
                        >
                            {minimized ? <ExpandMore /> : <ExpandLess />}
                        </IconButton>
                    </Typography>
                    <Box sx={{
                        maxHeight: minimized ? 0 : '300px',
                        transition: 'max-height 0.3s ease-in-out',
                        overflow: 'hidden',
                    }}>
                        <QuestList>
                            {quests.map((quest, key) => (
                                <QuestItemComponent key={key} quest={quest} />
                            ))}
                        </QuestList>
                    </Box>
                </CardContent>
            </TransparentCard>
        </Box>
    )
}