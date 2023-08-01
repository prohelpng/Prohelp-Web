import * as React from "react";
import Button from "@mui/material/Button"
import { styled } from '@mui/material/styles';

interface CustomButtonProps {
    children: React.ReactNode;
}

const RoundedButton = styled(Button)<CustomButtonProps>(({ theme }) => ({
    background: 'white',
    color: theme.palette.primary.main,
    padding: '12px',
    height: "100%",
    borderRadius: '32px',
    textTransform: 'capitalize',
    '&:hover': {
      background: theme.palette.primary.main,
      color: 'white',
    },
}));

export default RoundedButton;