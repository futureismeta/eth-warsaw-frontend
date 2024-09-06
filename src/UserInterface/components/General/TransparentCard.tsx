import {styled} from "@mui/system";
import {Card} from "@mui/material";

export const TransparentCard = styled(Card)(({theme}) => ({
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(10px)',
    color: theme.palette.common.white,
    border: '1px solid rgba(255, 255, 255, 0.2)',
}));