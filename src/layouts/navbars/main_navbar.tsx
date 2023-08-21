import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import brandDark from "../../assets/images/longo_dark.svg";
import brandLight from "../../assets/images/longo_light.svg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import RoundedButton from "../../components/button/round_button";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";
import RoundedButtonOutlined from "../../components/button/rounded_button_outlined";
import { SearchFieldTop } from "../../components/inputs/search_field";
import { Avatar, Button, Divider, IconButton } from "@mui/material";
import { useAppSelector } from "../../utils/hooks/apphook";
import CustomContainer from "../../components/container";
import AutocompleteMini from "../../components/inputs/auto_complete_mini";

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

export const CategoryLink = styled(Button)<CustomLinkProps>(({ theme }) => ({
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
  const [navColor, setNavColor] = React.useState("white");

  const [show, setShow] = React.useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

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
  const professions = useAppSelector((state) => state.professions.professions);

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

  }, [mobile, tablet, tabletBig]);

  React.useEffect(() => {
    if (
      location.pathname.startsWith("/explore") ||
      location.pathname.startsWith("/job") ||
      location.pathname.startsWith("/contact")
    ) {
      setNavColor("black");
    } else {
      if (scrolled) {
        setNavColor("black");
      } else {
        setNavColor("white");
      }
    }
  }, [location, scrolled]);

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar position="fixed" sx={{ bgcolor: "red" }}>
          <Toolbar>
            <CustomContainer>
              {deviceType === "pc" || deviceType === "tabletBig" ? (
                <Box
                  p={2}
                  color={navColor}
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Box onClick={() => navigate("/")} sx={{ cursor: "pointer" }}>
                    {location.pathname === "/explore" ||
                    location.pathname.startsWith("/jobs") ||
                    location.pathname.startsWith("/professionals") ||
                    location.pathname.startsWith("/category") ||
                    location.pathname.startsWith("/contact") ||
                    scrolled ? (
                      <ScrolledLogo scrolled={scrolled} />
                    ) : (
                      <DefaultLogo scrolled={scrolled} />
                    )}
                  </Box>
                  {show && deviceType === "pc" && <AutocompleteMini />}
                  <Box color={navColor}>
                    <CustomLink
                      to={"/"}
                      sx={{
                        color:
                          location.pathname === "/explore" ||
                          location.pathname.startsWith("/jobs") ||
                          location.pathname.startsWith("/professionals") ||
                          location.pathname.startsWith("/category") ||
                          location.pathname.startsWith("/contact") ||
                          scrolled
                            ? "black"
                            : "white",
                        borderBottom:
                          location.pathname === "/"
                            ? scrolled
                              ? "1px solid #000"
                              : "1px solid #fff"
                            : "none",
                      }}
                    >
                      Home
                    </CustomLink>
                    <CustomLink
                      to={"/explore"}
                      sx={{
                        color:
                          location.pathname === "/explore" ||
                          location.pathname.startsWith("/jobs") ||
                          location.pathname.startsWith("/professionals") ||
                          location.pathname.startsWith("/category") ||
                          location.pathname.startsWith("/contact") ||
                          scrolled
                            ? "black"
                            : "white",
                        borderBottom: location.pathname.startsWith("/explore")
                          ? scrolled
                            ? "1px solid #000"
                            : "1px solid #000"
                          : "none",
                      }}
                    >
                      Explore
                    </CustomLink>
                    <CustomLink
                      to={"/signup/recruiter"}
                      sx={{
                        color:
                          location.pathname === "/explore" ||
                          location.pathname.startsWith("/jobs") ||
                          location.pathname.startsWith("/professionals") ||
                          location.pathname.startsWith("/category") ||
                          location.pathname.startsWith("/contact") ||
                          scrolled
                            ? "black"
                            : "white",
                      }}
                    >
                      Become a Recruiter
                    </CustomLink>
                    <CustomLink
                      to={isAuth ? "/dashboard" : "/login"}
                      sx={{
                        color:
                          location.pathname === "/explore" ||
                          location.pathname.startsWith("/jobs") ||
                          location.pathname.startsWith("/professionals") ||
                          location.pathname.startsWith("/category") ||
                          location.pathname.startsWith("/contact") ||
                          scrolled
                            ? "black"
                            : "white",
                      }}
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
                          height: 40,
                          color:
                            location.pathname === "/explore" ||
                            location.pathname.startsWith("/jobs") ||
                            location.pathname.startsWith("/professionals") ||
                            location.pathname.startsWith("/category") ||
                            location.pathname.startsWith("/contact") ||
                            scrolled
                              ? "white"
                              : theme.palette.primary.main,
                          backgroundColor:
                            location.pathname === "/explore" ||
                            location.pathname.startsWith("/jobs") ||
                            location.pathname.startsWith("/professionals") ||
                            location.pathname.startsWith("/category") ||
                            location.pathname.startsWith("/contact") ||
                            scrolled
                              ? theme.palette.primary.main
                              : "white",
                        }}
                        onClick={() => navigate("/signup")}
                      >
                        Join us
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
                  {location.pathname === "/explore" ||
                  location.pathname.startsWith("/jobs") ||
                  location.pathname.startsWith("/professionals") ||
                  location.pathname.startsWith("/category") ||
                  location.pathname.startsWith("/contact") ||
                  scrolled ? (
                    <ScrolledLogo scrolled={scrolled} />
                  ) : (
                    <DefaultLogo scrolled={scrolled} />
                  )}
                  <Box sx={{ flexGrow: 1 }} />
                  {location.pathname.startsWith("/professionals") ||
                  location.pathname.startsWith("/category") ||
                  location.pathname.startsWith("/contact") ||
                  scrolled ? (
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
                            height: 36,
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
                  color={navColor}
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  {(professions ?? [])?.map((item: any, index: number) => (
                    <CategoryLink
                      onClick={() =>
                        navigate(
                          "/category/" +
                            item?.name?.replaceAll(" ", "")?.toLowerCase(),
                          { state: { data: item } }
                        )
                      }
                      sx={{ color: scrolled ? "black" : "white" }}
                    >
                      {item?.name}
                    </CategoryLink>
                  ))}
                </Box>
              )}
              {/* Same but for 10inch tablets */}
              {/* {show && deviceType === "tabletBig" && (
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
                    Catering Services
                  </CustomLink>
                  <CustomLink
                    to={""}
                    sx={{ color: scrolled ? "black" : "white" }}
                  >
                    Logistics & Travel
                  </CustomLink>
                  <CustomLink
                    to={""}
                    sx={{ color: scrolled ? "black" : "white" }}
                  >
                    General Services
                  </CustomLink>
                </Box>
              )} */}
            </CustomContainer>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
}
