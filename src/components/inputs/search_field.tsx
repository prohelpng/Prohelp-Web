import * as React from "react";
import TextField from "@mui/material/TextField"
import { styled } from '@mui/material/styles';
import Box from "@mui/system/Box"
import RoundedButton from "../button/round_button"

interface CustomTextFieldProps {
    children: React.ReactNode;
}

const TField = styled(TextField)<CustomTextFieldProps>(({ theme }) => ({
    background: 'rgba(72, 69, 70, 0.12)',
    color: 'white',
    '&:hover': {
      borderColor: theme.palette.primary.main,
    },
}));

export default function SearchField() {

    return <Box pl={1} 
        border="1px solid" 
        borderColor="white" 
        borderRadius={32}  
        display="flex" 
        flexDirection="row" 
        justifyContent="space-between" 
        alignItems="center" >
        <TextField 
            fullWidth 
            variant="standard" 
            size="small" 
            placeholder="Search for any service here ..." 
            sx={{border: "none", borderRadius: 32}}
            InputProps={{ disableUnderline: true }}
         />
        <RoundedButton sx={{height: '100%'}} >Search</RoundedButton>
    </Box>
}