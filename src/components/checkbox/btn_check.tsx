import * as React from "react";
import Button from "@mui/material/Button"
import { styled } from '@mui/material/styles';

interface CustomButtonProps {
    children: React.ReactNode;
}

const CustomCheckBox = styled(Button)<CustomButtonProps>(({ theme }) => ({
    color: theme.palette.primary.main,
    padding: '12px',
    height: "100%",
    border: '1.5px solid #eee',
    borderRadius: '16px',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: 'white',
      border: '1.5px solid #0066F5',
    },
}));

export default CustomCheckBox;