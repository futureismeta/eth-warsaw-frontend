import {styled} from "@mui/system";
import {Box, ListItem, ListItemText, Tooltip, Typography} from "@mui/material";
import {Cancel, CheckCircle} from "@mui/icons-material";
import React from "react";

const QuestItem = styled(ListItem)(({theme}) => ({
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'background-color 0.3s ease',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
}));

const QuestTitle = styled(Typography)(() => ({
    fontWeight: 'bold',
}));

const QuestStatus = styled(Typography)(({theme, completed}: { theme: any; completed: boolean }) => ({
    color: completed ? theme.palette.success.light : theme.palette.warning.light,
    fontSize: '0.75rem',
}));

interface Quest {
    title: string;
    isCompleted: boolean;
}

export const Quest = ({quest}: { quest: Quest }) => (
    <QuestItem>
        <ListItemText
            primary={<QuestTitle variant="body1">{quest.title}</QuestTitle>}
            secondary={
                <QuestStatus completed={quest.isCompleted}>
                    {quest.isCompleted ? 'Completed' : 'In Progress'}
                </QuestStatus>
            }
        />
        <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
            <Tooltip title={quest.isCompleted ? 'Quest Completed' : 'Quest In Progress'}>
                {quest.isCompleted ? (
                    <CheckCircle sx={{color: 'success.light'}}/>
                ) : (
                    <Cancel sx={{color: 'warning.light'}}/>
                )}
            </Tooltip>
        </Box>
    </QuestItem>
);