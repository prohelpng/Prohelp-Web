import {
  ArrowDropDown,
  HelpCenter,
  Notifications,
  SupportAgent,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { SearchFieldTop } from "../../components/inputs/search_field";
import { setAuth, setProfile } from "../../redux/reducers/auth";
import { setLoading } from "../../redux/reducers/loader";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/apphook";
// import brand from "../../assets/images/longo_light.svg";
import brandDark from "../../assets/images/longo_dark.svg";
import { CustomLink } from "./main_navbar";
import CustomContainer from "../../components/container";

import './pro.css'

const settings = ["Account", "Homepage", "Logout"];
const resources = [
  { title: "Overview", to: "" },
  { title: "Connects history", to: "" },
  { title: "Transactions history", to: "" },
];

export default function ProfessionalNavbar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const currlocation = useLocation();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  // const [selectedIndex, setSelectedIndex] = React.useState(0);
  //   const [open, setOpen] = React.useState(true);
  const [deviceType, setDeviceType] = React.useState("mobile");
  // const isAuth = useAppSelector((state) => state.auth.isAuth);
  const profile = useAppSelector((state) => state.auth.profile);

  const dispatch = useAppDispatch();

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

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      elevation={1.0}
      position="fixed"
      sx={{
        backgroundColor: "white",
        display: { xs: "none", sm: "none", md: "block" },
      }}
    >
      <CustomContainer>
        <Toolbar>
          <img
            src={brandDark}
            alt=""
            width={128}
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          />
          <CustomLink
            to={"/dashboard/explore"}
            sx={{
              pr: 1,
              pl: 2,
              color:
                currlocation.pathname === "/dashboard/explore"
                  ? theme.palette.primary.main
                  : "black",
            }}
          >
            Find Work
          </CustomLink>

          <CustomLink
            to={"/dashboard/connections"}
            sx={{
              px: 1,
              color:
                currlocation.pathname === "/dashboard/connections"
                  ? theme.palette.primary.main
                  : "black",
            }}
          >
            Connections
          </CustomLink>

          {/* <CustomLink
            to={"/dashboard/report"}
            sx={{
              px: 1,
              color:
                currlocation.pathname === "/dashboard/report"
                  ? theme.palette.primary.main
                  : "black",
            }}
          >
            Reports
          </CustomLink> */}
          <div className="dropdown">
            <Button
            
              className="dropbtn"
              endIcon={<ArrowDropDown sx={{ ml: -1 }} />}
              sx={{
                display: "flex",
                flexDirection: "row",
                color: 
                currlocation.pathname.startsWith("/dashboard/reports")
                  ? theme.palette.primary.main
                  : "black",
                textTransform: "capitalize",
              }}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
            >
              Reports
            </Button>
            <div className="dropdown-content">
              {resources?.map((elem, index) => (
                <MenuItem
                  key={index}
                  divider={true}
                  sx={{fontSize: 14}}
                  onClick={(e) => {
                    handleClose();
                    // history.push(elem.to);
                  }}
                >
                  {elem.title}
                </MenuItem>
              ))}
            </div>
          </div>

          <CustomLink
            to={"/dashboard/message"}
            sx={{
              px: 1,
              color:
                currlocation.pathname === "/dashboard/message"
                  ? theme.palette.primary.main
                  : "black",
            }}
          >
            Messages
          </CustomLink>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {<SearchFieldTop />}
            <IconButton
              size="large"
              aria-label="sh"
              color="inherit"
              sx={{ ml: 2 }}
            >
              <SupportAgent sx={{ color: "black" }} />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              sx={{ mr: 2, ml: 1 }}
            >
              <Badge badgeContent={17} color="error">
                <Notifications sx={{ color: "black" }} />
              </Badge>
            </IconButton>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={profile?.bio?.image} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    handleCloseUserMenu();
                    if (setting === "Logout") {
                      logout();
                    } else if (setting === "Homepage") {
                      navigate("/");
                    } else {
                      navigate("/dashboard/account");
                      setSelectedIndex(5);
                    }
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </CustomContainer>
    </AppBar>
  );
}
