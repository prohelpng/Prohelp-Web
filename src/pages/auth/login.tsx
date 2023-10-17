import * as React from "react";
import {
  AppBar,
  Box,
  Button,
  Card,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import brand from "../../assets/images/longo_dark.svg";
import googleBrand from "../../assets/images/google_logo.png";
import DividerText, {
  DividerLongText,
} from "../../components/divider/text_divider";
import LoginForm from "../../components/forms/auth/login_form";

export default function Login(): React.JSX.Element {
  const navigate = useNavigate();

  const [deviceType, setDeviceType] = React.useState("mobile");
  const theme = useTheme();

  const mobile = useMediaQuery(theme.breakpoints.only("xs"));
  const tablet = useMediaQuery(theme.breakpoints.only("sm"));



  React.useEffect(() => {
    if (mobile) {
      setDeviceType("mobile");
    } else if (tablet) {
      setDeviceType("tablet");
    } else {
      setDeviceType("pc");
    }
  }, [mobile, tablet]);

  return (
    <Box bgcolor={"white"} height={"100%"}>
      <React.Fragment>
        <CssBaseline />
        <AppBar
          elevation={0.0}
          position="fixed"
          sx={{ backgroundColor: "white" }}
        >
          <Toolbar>
            <Box
              width={"100%"}
              height={"100%"}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <img
                src={brand}
                alt=""
                width={100}
                style={{ padding: 10, cursor: "pointer" }}
                onClick={() => navigate("/")}
              />
            </Box>
          </Toolbar>
        </AppBar>
        <Box height={"100%"}>
          {deviceType !== "mobile" && <Toolbar />}
          <Container
          maxWidth={false}
            sx={{
              width:
                deviceType === "pc"
                  ? "60%"
                  : deviceType === "tablet"
                  ? "75%"
                  : "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card>
              <Box
                padding={deviceType !== "mobile" ? 4 : 2}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"start"}
                alignItems={"center"}
              >
                <Typography mb={4} fontWeight={600} variant="h5" gutterBottom>
                  Login to Your Prohelp Account
                </Typography>

                <LoginForm />

                <Box mb={3} width={deviceType === "mobile" ? "100%" : "70%"}>
                  <DividerText />
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    mb: 4,
                    borderRadius: 36,
                    textTransform: "capitalize",
                    p: 1,
                  }}
                >
                  <Box
                    bgcolor={"white"}
                    width={32}
                    height={32}
                    p={2}
                    borderRadius={16}
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    position={"absolute"}
                    left={2}
                  >
                    <img src={googleBrand} alt="" width={21} />
                  </Box>
                  <Typography>Continue with Google</Typography>
                </Button>

                <Toolbar />
                <DividerLongText label=" Don't have an account?" />
                <Button
                  variant="outlined"
                  onClick={() => navigate("/signup")}
                  sx={{
                    borderRadius: 32,
                    mt: 2,
                    width: 128,
                    textTransform: "capitalize",
                  }}
                >
                  Signup
                </Button>
              </Box>
            </Card>
          </Container>
        </Box>
      </React.Fragment>
    </Box>
  );
}
