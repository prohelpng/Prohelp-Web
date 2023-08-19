import * as React from "react"
import Box from "@mui/system/Box"
import { useTheme, styled } from "@mui/material/styles"
import brand from "../../assets/images/longo_light.svg"
import useMediaQuery from "@mui/material/useMediaQuery"
import { NavLink } from "react-router-dom"
import Grid from "@mui/material/Grid"
import appStoreLogo from "../../assets/images/appstore.svg"
import googlePlayLogo from "../../assets/images/googleplay.svg"
import IconButton from "@mui/material/IconButton"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

import SvgIcon from '@mui/material/SvgIcon';


interface CustomButtonProps {
    children: React.ReactNode;
}

interface CustomLinkProps {
    children: React.ReactNode;
}

const SocialButton = styled(IconButton)<CustomButtonProps>(({ theme }) => ({
    background: 'rgba(72, 69, 70, 0.12)',
    color: 'white',
    padding: '8px',
    margin: '10px',
    '&:hover': {
      background: theme.palette.primary.main,
    },
}));

const CustomLink = styled(NavLink)<CustomLinkProps>(({ theme }) => ({
    color: 'white',
    padding: '8px',
    textDecoration: "none",
    margin: '10px',
    '&:hover': {
      color: theme.palette.primary.main,
    },
}));
  
  

export default function Footer() {

    const [deviceType, setDeviceType] = React.useState("mobile");

    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.only("xs"))
    const tablet = useMediaQuery(theme.breakpoints.only("sm"))

    React.useEffect(() => {
        if (mobile) {
            setDeviceType("mobile")
        }
        else if (tablet) {
            setDeviceType("tablet")
        }
        else {
            setDeviceType("pc")
        }
    }, [mobile, tablet])

    return <Box 
    bgcolor="#131022" 
    padding={deviceType === "mobile" ? 4 : 8 } 
    display="flex" 
    flexDirection="column" 
    justifyContent="center" 
    alignItems="center" 
    paddingBottom={1} >
        {/* Brand long logo here */}
        <img src={brand} width={deviceType === "mobile" ? "60%" : deviceType === "tablet" ? "30%" : "20%"} alt="" />
        <Box 
            width={deviceType === "mobile" ? "100%" : deviceType === "tablet" ? "86%" : "40%"} 
            paddingTop={6} 
            paddingBottom={3} 
            display="flex" 
            flexDirection="row" 
            justifyContent="center" 
            alignItems="center">
            <Grid container spacing={2} display="flex" flexDirection="row" justifyContent="space-around" alignItems="center" >
                <Grid item xs={6} sm={3} md={3}> <CustomLink to="" style={{color: "white", textDecoration: "none"}} > FAQ's </CustomLink> </Grid>
                <Grid item xs={6} sm={3} md={3}> <NavLink to="" style={{color: "white", textDecoration: "none"}} > Contact us </NavLink> </Grid>
                <Grid item xs={6} sm={3} md={3}> <NavLink to="" style={{color: "white", textDecoration: "none"}} > Terms of Use </NavLink> </Grid>
                <Grid item xs={6} sm={3} md={3}> <NavLink to="/privacy-policy" style={{color: "white", textDecoration: "none"}} > Privacy Policy </NavLink> </Grid>
            </Grid>
        </Box>
        <Box paddingY={3}>
            <Grid container spacing={4} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" sx={{width: "100%"}}  >
                <Grid item xs={12} sm={6} > 
                    <Button sx={{padding: 0}} variant="contained" >
                        <Box 
                            borderRadius={2} 
                            bgcolor="white" 
                            px={3} py={1.2} 
                            display="flex" 
                            flexDirection="row" 
                            justifyContent="center" 
                            alignItems="center" >
                            <img src={appStoreLogo} alt="" width={128} />
                        </Box> 
                    </Button> 
                </Grid>
                <Grid item xs={12} sm={6}> 
                    <Button sx={{padding: 0}} variant="contained">
                        <Box 
                            borderRadius={2} 
                            bgcolor="white" 
                            px={3} py={1.2} 
                            display="flex" 
                            flexDirection="row" 
                            justifyContent="center" 
                            alignItems="center"> 
                            <img src={googlePlayLogo}  width={128} alt="" />
                        </Box> 
                    </Button>
                </Grid>
            </Grid>
        </Box>
        <Box 
            paddingY={3} 
            display="flex" 
            flexDirection="row" 
            justifyContent="center" 
            alignItems="center" 
            width={256}>
            <SocialButton > 
                <SvgIcon>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512" fill="white" >
                        {/* <style>svg{fill:#aab0bb}</style> */}
                        <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
                    </svg>
                </SvgIcon>
            </SocialButton>
            <SocialButton> 
                <SvgIcon>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill="white">
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                </svg>
                </SvgIcon>
            </SocialButton>
            <SocialButton > 
                <SvgIcon>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill="white">
                    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/>
                </svg>
                </SvgIcon>
            </SocialButton>
        </Box>
        <Box paddingTop={2} 
            display="flex" 
            flexDirection="row" 
            justifyContent="center" 
            alignItems="center"  >
            <Typography gutterBottom={true} textAlign="center" color="rgba(135, 133, 134, 0.96)" >{`Copyright © ${new Date()?.getFullYear()}. Prohelp All rights reserved.`}</Typography>
        </Box>
    </Box>
}