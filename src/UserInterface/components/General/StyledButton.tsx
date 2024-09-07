import {styled} from "@mui/system";
import {Button} from "@mui/material";

export const StyledButton = styled(Button)(({ theme }) => ({
    width: '100%',
    color: theme.palette.common.white,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    '&:hover': {
        borderColor: theme.palette.common.white,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
}))