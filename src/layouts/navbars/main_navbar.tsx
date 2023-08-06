import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import brandDark from "../../assets/images/longo_dark.svg";
import brandLight from "../../assets/images/longo_light.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import RoundedButton from "../../components/button/round_button";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";
import RoundedButtonOutlined from "../../components/button/rounded_button_outlined";
import { SearchFieldTop } from "../../components/inputs/search_field";
import { Avatar, Divider, IconButton } from "@mui/material";
import { useAppSelector } from "../../utils/hooks/apphook";

export interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

interface LogoProps {
  scrolled: boolean;
}

interface CustomLinkProps {
  children: React.ReactNode;
}

function ElevationScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 30,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    style: {
      backgroundColor: trigger ? "#ffffff" : "transparent",
      color: trigger ? "#000" : "#ffffff",
      transition: "background-color 0.3s ease", // Add a smooth transition effect
    },
  });
}

const DefaultLogo: React.FC<LogoProps> = ({ scrolled }) => (
  <img src={brandLight} alt="" width={144} />
);

const ScrolledLogo: React.FC<LogoProps> = ({ scrolled }) => (
  <img src={brandDark} alt="" width={144} />
);

export const CustomLink = styled(NavLink)<CustomLinkProps>(({ theme }) => ({
  color: "white",
  padding: "8px",
  textDecoration: "none",
  margin: "10px",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

export default function MainNavbar(props: Props) {
  const [deviceType, setDeviceType] = React.useState("mobile");
  const [scrolled, setScrolled] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

  const handleScroll = () => {
    setScrolled(window.pageYOffset > 0);
    if (window.pageYOffset > 200) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const profile = useAppSelector((state) => state.auth.profile);
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  const mobile = useMediaQuery(theme.breakpoints.only("xs"));
  const tablet = useMediaQuery(theme.breakpoints.only("sm"));
  const tabletBig = useMediaQuery(theme.breakpoints.only("md"));

  React.useEffect(() => {
    if (mobile) {
      setDeviceType("mobile");
    } else if (tablet) {
      setDeviceType("tablet");
    } else if (tabletBig) {
      setDeviceType("tabletBig");
    } else {
      setDeviceType("pc");
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar position="fixed">
          <Toolbar>
            <Container sx={{ display: "flex", flexDirection: "column" }}>
              {deviceType === "pc" || deviceType === "tabletBig" ? (
                <Box
                  p={2}
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Box>
                    {scrolled ? (
                      <ScrolledLogo scrolled={scrolled} />
                    ) : (
                      <DefaultLogo scrolled={scrolled} />
                    )}
                  </Box>
                  {show && deviceType === "pc" && <SearchFieldTop />}
                  <Box>
                    <CustomLink
                      to={""}
                      sx={{ color: scrolled ? "black" : "white" }}
                    >
                      Explore
                    </CustomLink>
                    <CustomLink
                      to={""}
                      sx={{ color: scrolled ? "black" : "white" }}
                    >
                      Become a Recruiter
                    </CustomLink>
                    <CustomLink
                      to={isAuth ? "/dashboard" : "/login"}
                      sx={{ color: scrolled ? "black" : "white" }}
                    >
                      {`${
                        isAuth ? profile?.bio?.firstname + "..." : "Sign in"
                      }`}
                    </CustomLink>

                    {isAuth ? (
                      <IconButton onClick={() => navigate("/dashboard")}>
                        <Avatar
                          alt="Remy Sharp"
                          src="https://pbs.twimg.com/profile_images/864104988146114560/MSWTWwno_400x400.jpg"
                        />
                      </IconButton>
                    ) : (
                      <RoundedButton
                        sx={{
                          width: 128,
                          color: scrolled
                            ? "white"
                            : theme.palette.primary.main,
                          backgroundColor: scrolled
                            ? theme.palette.primary.main
                            : "white",
                        }}
                        onClick={() => navigate("/signup")}
                      >
                        Sign in
                      </RoundedButton>
                    )}
                  </Box>
                </Box>
              ) : (
                <Box
                  width={"100%"}
                  p={deviceType === "pc" ? 2 : 0}
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  {scrolled ? (
                    <ScrolledLogo scrolled={scrolled} />
                  ) : (
                    <DefaultLogo scrolled={scrolled} />
                  )}
                  <Box sx={{ flexGrow: 1 }} />
                  {scrolled ? (
                    <>
                      <CustomLink
                        to={isAuth ? "/dashboard" : "/login"}
                        sx={{ color: scrolled ? "black" : "white" }}
                      >
                        {`${
                          isAuth ? profile?.bio?.firstname + "..." : "Sign in"
                        }`}
                      </CustomLink>
                      {isAuth ? (
                        <IconButton onClick={() => navigate("/dashboard")}>
                          <Avatar
                            alt="Remy Sharp"
                            src="https://pbs.twimg.com/profile_images/864104988146114560/MSWTWwno_400x400.jpg"
                          />
                        </IconButton>
                      ) : (
                        <RoundedButton
                          sx={{
                            width: 86,
                            height: 40,
                            color: "white",
                            backgroundColor: theme.palette.primary.main,
                          }}
                          onClick={() => navigate("/signup")}
                        >
                          Join
                        </RoundedButton>
                      )}
                    </>
                  ) : (
                    <>
                      <CustomLink
                        to={isAuth ? "/dashboard" : "/login"}
                        sx={{ color: scrolled ? "black" : "white" }}
                      >
                        {`${
                          isAuth ? profile?.bio?.firstname + "..." : "Sign in"
                        }`}
                      </CustomLink>
                      {isAuth ? (
                        <IconButton onClick={() => navigate("/dashboard")}>
                          <Avatar
                            alt="Remy Sharp"
                            src="https://pbs.twimg.com/profile_images/864104988146114560/MSWTWwno_400x400.jpg"
                          />
                        </IconButton>
                      ) : (
                        <RoundedButtonOutlined
                          variant="outlined"
                          sx={{
                            width: 86,
                            height: 40,
                            color: "white",
                          }}
                        >
                          Join
                        </RoundedButtonOutlined>
                      )}
                    </>
                  )}
                </Box>
              )}
              <Divider />
              {show && deviceType === "pc" && (
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <CustomLink
                    to={""}
                    sx={{ color: scrolled ? "black" : "white" }}
                  >
                    Graphics & Design
                  </CustomLink>
                  <CustomLink
                    to={""}
                    sx={{ color: scrolled ? "black" : "white" }}
                  >
                    Programming & Tech
                  </CustomLink>
                  <CustomLink
                    to={""}
                    sx={{ color: scrolled ? "black" : "white" }}
                  >
                    Video & Animation
                  </CustomLink>
                  <CustomLink
                    to={""}
                    sx={{ color: scrolled ? "black" : "white" }}
                  >
                    Writing & Translation
                  </CustomLink>
                  <CustomLink
                    to={""}
                    sx={{ color: scrolled ? "black" : "white" }}
                  >
                    Digital Marketing
                  </CustomLink>
                </Box>
              )}
              {/* Same but for 10inch tablets */}
              {show && deviceType === "tabletBig" && (
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <CustomLink
                    to={""}
                    sx={{ color: scrolled ? "black" : "white" }}
                  >
                    Graphics & Design
                  </CustomLink>
                  <CustomLink
                    to={""}
                    sx={{ color: scrolled ? "black" : "white" }}
                  >
                    Programming & Tech
                  </CustomLink>
                  <CustomLink
                    to={""}
                    sx={{ color: scrolled ? "black" : "white" }}
                  >
                    Video & Animation
                  </CustomLink>
                  <CustomLink
                    to={""}
                    sx={{ color: scrolled ? "black" : "white" }}
                  >
                    Writing & Translation
                  </CustomLink>
                  <CustomLink
                    to={""}
                    sx={{ color: scrolled ? "black" : "white" }}
                  >
                    Digital Marketing
                  </CustomLink>
                </Box>
              )}
            </Container>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
}
