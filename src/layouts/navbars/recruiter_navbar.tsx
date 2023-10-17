import { Notifications } from "@mui/icons-material";
import { AppBar, Avatar, Badge, Box, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { SearchFieldTop } from "../../components/inputs/search_field";
import { setAuth, setProfile } from "../../redux/reducers/auth";
import { setLoading } from "../../redux/reducers/loader";
import { useAppDispatch } from "../../utils/hooks/apphook";
import brand from "../../assets/images/longo_light.svg";
import brandDark from "../../assets/images/longo_dark.svg";


const settings = ["Account", "Homepage", "Logout"];

export default function RecruiterNavbar() {
    const theme = useTheme();
  const navigate = useNavigate();
  const currlocation = useLocation();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  // const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [open, setOpen] = React.useState(true);
  const [deviceType, setDeviceType] = React.useState("mobile");

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
      <Toolbar>
        <img
          src={brandDark}
          alt=""
          width={128}
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        />
        <NavLink to={"/dashboard/explore"}>Find Skills</NavLink>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          {<SearchFieldTop />}
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
            sx={{ mx: 2 }}
          >
            <Badge badgeContent={17} color="error">
              <Notifications sx={{ color: "black" }} />
            </Badge>
          </IconButton>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt="Remy Sharp"
                src="https://pbs.twimg.com/profile_images/864104988146114560/MSWTWwno_400x400.jpg"
              />
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
    </AppBar>
  );
}
