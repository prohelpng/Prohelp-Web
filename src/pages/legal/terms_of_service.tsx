import {
    AppBar,
    Box,
    Container,
    Toolbar,
    Typography,
  } from "@mui/material";
  import brand from "../../assets/images/longo_dark.svg";
  import theme from "../../assets/theme/Theme";
  import { useNavigate } from "react-router-dom";
  
  export default function TermsOfService(): React.JSX.Element {
    const navigate = useNavigate();
  
    return (
      <Box
        height={"100vh"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"start"}
        alignItems={"stretch"}
      >
        <AppBar position="sticky" elevation={1} sx={{ bgcolor: "white" }}>
          <Toolbar>
            <Container>
              <Box
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"start"}
                alignItems={"center"}
              >
                <img
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/")}
                  src={brand}
                  alt="prohelp-icon"
                  width={125}
                />
                <Typography px={2} fontWeight={600} color={"grey"}>
                  Legal
                </Typography>
              </Box>
            </Container>
          </Toolbar>
        </AppBar>
        <Box flex={1} p={2}>
          <Container>
            <Typography> The terms of service goes in here ... </Typography>
          </Container>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          borderTop={"0.5px solid"}
          padding={1}
        >
          <Typography component={"p"} color={theme.palette.primary.main}>
            {`Copyright © ${new Date().getFullYear()}. ProHelp Inc`}
          </Typography>
        </Box>
      </Box>
    );
  }
  