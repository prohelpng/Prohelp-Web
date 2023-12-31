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
// import { SearchFieldTop } from "../../components/inputs/search_field";
import { Avatar, Button, Divider, IconButton, MenuItem } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/apphook";
import CustomContainer from "../../components/container";
import AutocompleteMini from "../../components/inputs/auto_complete_mini";
// import theme from "../../assets/theme/Theme";

import "./pro.css";
import { setLoading } from "../../redux/reducers/loader";
import { setAuth, setProfile } from "../../redux/reducers/auth";

import toast from "react-hot-toast";

export interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

interface LogoProps {
  scrolled: boolean;
  deviceType: string;
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

const DefaultLogo: React.FC<LogoProps> = ({ scrolled, deviceType }) => (
  <img
    src={brandLight}
    alt=""
    width={
      deviceType === "mobile"
        ? 100
        : deviceType === "tablet"
        ? 128
        : deviceType === "tabletBig"
        ? 144
        : 186
    }
  />
);

const ScrolledLogo: React.FC<LogoProps> = ({ scrolled, deviceType }) => (
  <img
    src={brandDark}
    alt=""
    width={
      deviceType === "mobile"
        ? 100
        : deviceType === "tablet"
        ? 128
        : deviceType === "tabletBig"
        ? 144
        : 186
    }
  />
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
  paddingY: "8px",
  textDecoration: "none",
  margin: "10px",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

const resources = [
  { title: "Profile", to: "/dashboard" },
  { title: "Log out", to: "" },
];

export default function MainNavbar(props: Props) {
  const [deviceType, setDeviceType] = React.useState("mobile");
  const [scrolled, setScrolled] = React.useState(false);
  const [navColor, setNavColor] = React.useState("white");

  const [show, setShow] = React.useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const open2 = Boolean(anchorEl2);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleScroll = () => {
    setScrolled(window.pageYOffset > 0);
    if (window.pageYOffset > 200) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const dispatch = useAppDispatch();
  
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

  const logout = () => {
    dispatch(setLoading(true));
    try {
      setTimeout(() => {
        localStorage.clear();
        dispatch(setAuth(false));
        dispatch(setProfile(null));
        dispatch(setLoading(false));
        toast.success("Logged out successfully");
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar position="fixed" sx={{ bgcolor: "red" }}>
          <Toolbar>
            <CustomContainer>
              {deviceType === "pc" || deviceType === "tabletBig" ? (
                <Box
                  py={2}
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
                    location.pathname.startsWith("/searchresults") ||
                    scrolled ? (
                      <ScrolledLogo scrolled={scrolled} deviceType={deviceType} />
                    ) : (
                      <DefaultLogo scrolled={scrolled}  deviceType={deviceType}/>
                    )}
                  </Box>
                  {show && deviceType === "pc" && <AutocompleteMini />}
                  <Box
                    color={navColor}
                    display={"flex"}
                    flexDirection={"row"}
                    alignItems={"center"}
                  >
                    <CustomLink
                      to={"/"}
                      sx={{
                        color:
                          location.pathname === "/explore" ||
                          location.pathname.startsWith("/jobs") ||
                          location.pathname.startsWith("/professionals") ||
                          location.pathname.startsWith("/category") ||
                          location.pathname.startsWith("/contact") ||
                          location.pathname.startsWith("/searchresults") ||
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
                          location.pathname.startsWith("/searchresults") ||
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
                          location.pathname.startsWith("/searchresults") ||
                          scrolled
                            ? "black"
                            : "white",
                      }}
                    >
                      Hire a Professional
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
                          location.pathname.startsWith("/searchresults") ||
                          scrolled
                            ? "black"
                            : "white",
                      }}
                    >
                      {`${
                        isAuth ? profile?.bio?.firstname + "..." : "Sign in"
                      }`}
                    </CustomLink>
                    {/* onClick={() => navigate("/dashboard")}  */}
                    {isAuth ? (
                      <div className="dropdown">
                        <Button
                          className="dropbtn"
                          // endIcon={<ArrowDropDown sx={{ ml: -1 }} />}
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            // color:
                            // currlocation.pathname.startsWith("/dashboard/reports")
                            //   ? theme.palette.primary.main
                            //   : "black",
                            // textTransform: "capitalize",
                          }}
                          id="basic-button"
                          aria-controls={open ? "basic-menu" : undefined}
                          aria-haspopup="true"
                        >
                          <Avatar alt="Remy Sharp" src={profile?.bio?.image} />
                        </Button>
                        <div className="dropdown-content">
                          {resources?.map((elem, index) => (
                            <MenuItem
                              key={index}
                              divider={true}
                              sx={{ fontSize: 16 }}
                              onClick={(e) => {
                                handleClose();
                                if (index === 0) {
                                  navigate(elem.to);
                                }else {
                                  // Log out here
                                  logout();
                                }
                              }}
                            >
                              {elem.title}
                            </MenuItem>
                          ))}
                        </div>
                      </div>
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
                            location.pathname.startsWith("/searchresults") ||
                            scrolled
                              ? "white"
                              : theme.palette.primary.main,
                          backgroundColor:
                            location.pathname === "/explore" ||
                            location.pathname.startsWith("/jobs") ||
                            location.pathname.startsWith("/professionals") ||
                            location.pathname.startsWith("/category") ||
                            location.pathname.startsWith("/contact") ||
                            location.pathname.startsWith("/searchresults") ||
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
                  py={0}
                  color={navColor}
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
                  location.pathname.startsWith("/searchresults") ||
                  scrolled ? (
                    <ScrolledLogo scrolled={scrolled}  deviceType={deviceType} />
                  ) : (
                    <DefaultLogo scrolled={scrolled} deviceType={deviceType} />
                  )}
                  <Box sx={{ flexGrow: 1 }} />
                  {location.pathname.startsWith("/professionals") ||
                  location.pathname.startsWith("/category") ||
                  location.pathname.startsWith("/contact") ||
                  location.pathname.startsWith("/searchresults") ||
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
                          <Avatar alt="Remy Sharp" src={profile?.bio?.image} />
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
                        sx={{ color: "black" }}
                      >
                        {`${
                          isAuth ? profile?.bio?.firstname + "..." : "Sign in"
                        }`}
                      </CustomLink>
                      {isAuth ? (
                        <IconButton onClick={() => navigate("/dashboard")}>
                          <Avatar alt="Remy Sharp" src={profile?.bio?.image} />
                        </IconButton>
                      ) : (
                        <RoundedButtonOutlined
                          variant="outlined"
                          sx={{
                            width: 86,
                            height: 36,
                            color: theme.palette.primary.main,
                            borderColor: theme.palette.primary.main,
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
            </CustomContainer>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
}
