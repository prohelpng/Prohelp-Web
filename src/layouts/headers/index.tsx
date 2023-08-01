import React from "react"
import Box from "@mui/system/Box"
import Grid from "@mui/material/Grid"
import Toolbar from "@mui/material/Toolbar"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import { useTheme } from '@mui/material/styles';
import image from "../../assets/images/smiling_lady.png"
import SearchField from "../../components/inputs/search_field"

export default function Header() {
    const theme = useTheme();

    return <Box height="80vh" bgcolor={theme.palette.primary.main} >
        <Toolbar />
        <Container sx={{height: '100%'}} >
            <Grid sx={{height: '100%'}} container spacing={2} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" >
                <Grid item xs={12} sm={7} md={6}>
                    <Box display="flex" flexDirection="row" justifyContent="start" alignItems="center" >
                        <Typography variant="h3" component="h1" color="white">
                            Find the right  
                        </Typography>
                        <Typography px={1} fontStyle="italic" variant="h3" component="h1" color="white">
                            {` professional`} 
                        </Typography>
                    </Box>
                    <Typography gutterBottom variant="h3" component="h1" color="white">
                        service, for you
                    </Typography>
                    <SearchField />
                </Grid>
                <Grid sx={{height: '80%'}} item xs={12} sm={5} md={6}>
                    <img src={image} width="100%" alt="" />
                </Grid>
            </Grid>
        </Container>
    </Box>
}