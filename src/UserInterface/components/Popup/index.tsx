import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { styled } from "@mui/system";
import { Close as CloseIcon } from '@mui/icons-material';
import {PopupCard} from "../General/PopupCard";

const CloseButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500], // Grey close button color
}));

interface GenericPopupProps {
    title: string;
    onClose: () => void;
    children: React.ReactNode; // Content to display in the popup
}

const GenericPopup: React.FC<GenericPopupProps> = ({ title, onClose, children }) => {
    return (
        <PopupCard>
            <CloseButton onClick={onClose} aria-label="close">
                <CloseIcon />
            </CloseButton>
            <Typography variant="h4" component="h1" gutterBottom>
                {title}
            </Typography>
            <Box>
                {children} {/* Dynamic content to be passed */}
            </Box>
        </PopupCard>
    );
};

export default GenericPopup;
