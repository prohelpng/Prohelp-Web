import React from "react"
import Box from "@mui/system/Box"
import Grid from "@mui/material/Grid"
import Toolbar from "@mui/material/Toolbar"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import { useTheme } from '@mui/material/styles';

export default function Header() {
    const theme = useTheme();

    return <Box height="80vh" bgcolor={theme.palette.primary.main} >
        <Toolbar />
        <Container sx={{height: '100%'}} >
            <Grid sx={{height: '100%'}} container spacing={2} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" >
                <Grid item xs={12} sm={7} md={6}>
                    <Typography fontSize="2rem" variant="h4" component="h1" color="white">
                        Find the right professional 
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={5} md={6}>

                </Grid>
            </Grid>
        </Container>
    </Box>
}