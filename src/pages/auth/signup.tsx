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
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import brand from "../../assets/images/longo_dark.svg";
import googleBrand from "../../assets/images/google_logo.png";
import DividerText from "../../components/divider/text_divider";
import SignupForm from "../../components/forms/auth/signup_form";

export default function Signup(): React.JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  let accountType;
  const [deviceType, setDeviceType] = React.useState("mobile");
  const theme = useTheme();

  const mobile = useMediaQuery(theme.breakpoints.only("xs"));
  const tablet = useMediaQuery(theme.breakpoints.only("sm"));

  if (location?.state) {
    accountType = location?.state?.accountType;
  }

  React.useEffect(() => {
    if (mobile) {
      setDeviceType("mobile");
    } else if (tablet) {
      setDeviceType("tablet");
    } else {
      setDeviceType("pc");
    }
  }, []);

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
              <NavLink
                to={"/login"}
                style={{
                  textDecoration: "none",
                  color: theme.palette.primary.main,
                  fontWeight: "600",
                }}
              >
                {deviceType === "mobile" ? "Login" : "Login instead"}
              </NavLink>
            </Box>
          </Toolbar>
        </AppBar>
        <Box height={"100%"}>
          <Toolbar />
          <Container
            sx={{
              width:
                deviceType === "pc"
                  ? "60%"
                  : deviceType === "tablet"
                  ? "75%"
                  : "100%",
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
                  {accountType === "recruiter"
                    ? "Sign up to hire talent"
                    : "Sign up to find work you love"}
                </Typography>

                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    mb: 4,
                    borderRadius: 36,
                    textTransform: "capitalize",
                    width: deviceType === "mobile" ? "100%" : "50%",
                  }}
                >
                  <Box
                    bgcolor={"white"}
                    width={32}
                    height={32}
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

                <Box mb={3} width={deviceType === "mobile" ? "100%" : "70%"}>
                  <DividerText />
                </Box>
                <SignupForm accountType={accountType} />
              </Box>
            </Card>
          </Container>
        </Box>
      </React.Fragment>
    </Box>
  );
}
