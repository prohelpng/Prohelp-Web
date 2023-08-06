import * as React from "react";
import Button from "@mui/material/Button"
import { styled } from '@mui/material/styles';

interface CustomButtonProps {
    children: React.ReactNode;
}

const RoundedButtonOutlined = styled(Button)<CustomButtonProps>(({ theme }) => ({
    borderColor: 'white',
    color: theme.palette.primary.main,
    padding: '12px',
    height: "100%",
    borderRadius: '32px',
    textTransform: 'capitalize',
    '&:hover': {
      background: "#131022",
      color: 'white',
      border: 'none'
    },
}));

export const RoundedButtonOutlinedDark = styled(Button)<CustomButtonProps>(({ theme }) => ({
  borderColor: theme.palette.primary.main,
  color: theme.palette.primary.main,
  padding: '12px',
  height: "100%",
  borderRadius: '32px',
  textTransform: 'capitalize',
  '&:hover': {
    background: "#131022",
    color: 'white',
    border: 'none'
  },
}));

export default RoundedButtonOutlined;