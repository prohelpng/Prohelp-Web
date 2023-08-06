import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import brand from "../../assets/images/longo_light.svg";
import brandDark from "../../assets/images/longo_dark.svg";
import { Outlet, useNavigate } from "react-router-dom";

import exploreIcon from "../../assets/images/explore_icon.svg";
import jobIcon from "../../assets/images/jobs.svg";
import messageIcon from "../..//assets/images/message_icon.svg";
import accountIcon from "../../assets/images/account_icon.svg";
import supportIcon from "../../assets/images/support.svg";
import {
  Avatar,
  Badge,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import RoundedButton from "../../components/button/round_button";
import { Logout, Notifications } from "@mui/icons-material";
import MaterialSearchbar from "../../components/inputs/material_search";
import { SearchFieldTop } from "../../components/inputs/search_field";

import customMenuIcon from "../../assets/images/menu_icon.svg";

const drawerWidth = 260;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface ListItemButtonProps {
  children: React.ReactNode;
}

// interface ImageProps {
//   children: React.JSX.IntrinsicElements;
// }

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const settings = ["Account", "Logout"];

const MListItemButton = styled(ListItemButton)<ListItemButtonProps>(
  ({ theme }) => ({
    background: "tranparent",
    color: "#8A95BF",
    padding: "12px",
    height: "100%",
    width: "100%",
    textAlign: "start",
    borderRadius: "16px",
    textTransform: "capitalize",
    "&:hover": {
      background: "#fff",
      color: theme.palette.primary.main,
    },
  })
);

export default function DashbboardLayout() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [open, setOpen] = React.useState(true);
  const [deviceType, setDeviceType] = React.useState("mobile");

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

  const handlleItemClick = (
    e: React.MouseEvent<HTMLElement>,
    index: number,
    route: string
  ) => {
    setSelectedIndex(index);
    navigate(route);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const activeRootStyle = {
    color: theme.palette.primary.main,
    fontWeight: "fontWeightMedium",
    background: "white",
    textAlign: "start",
    borderRadius: "16px",
    textTransform: "capitalize",
  };

  const drawerListItems = [
    {
      title: "Explore",
      route: "/dashboard/explore",
      icon: exploreIcon,
      key: "explore",
    },
    {
      title: "Jobs",
      route: "/dashboard/jobs",
      icon: jobIcon,
      key: "jobs",
    },
    {
      title: "Message",
      route: "/dashboard/message",
      icon: messageIcon,
      key: "message",
    },
    {
      title: "Support",
      route: "/dashboard/support",
      icon: supportIcon,
      key: "support",
    },
  ];

  const drawerListItems2 = [
    {
      title: "About",
      route: "/dashboard/about",
      icon: exploreIcon,
      key: "about",
    },
    {
      title: "Account",
      route: "/dashboard/account",
      icon: accountIcon,
      key: "account",
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {deviceType !== "pc" && (
        <AppBar elevation={0.0}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ml: -0.75,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon color="primary" />
            </IconButton>
            <img
              src={brand}
              alt=""
              width={128}
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            />
            <Box sx={{ flexGrow: 1 }} />
            <img
              src={customMenuIcon}
              alt=""
              width={32}
              style={{ color: "white" }}
            />
          </Toolbar>
        </AppBar>
      )}
      <AppBar
        elevation={0.0}
        position="fixed"
        open={open}
        sx={{
          backgroundColor: open ? theme.palette.primary.main : "#eee",
          display: { xs: "none", sm: "none", md: "block" },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ml: -0.75,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon color="primary" />
          </IconButton>
          <img
            src={brandDark}
            alt=""
            width={128}
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {open ? <MaterialSearchbar /> : <SearchFieldTop />}
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
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{ display: { xs: "none", sm: "none", md: "block" } }}
        variant="permanent"
        open={open}
      >
        <Box
          borderRadius={open ? 0 : 21}
          ml={open ? 0 : 1}
          mb={open ? 0 : 1}
          bgcolor={open ? theme.palette.primary.main : "transparent"}
          height={"100%"}
          display={"flex"}
          flexDirection={"column"}
        >
          <DrawerHeader
            sx={{
              display: "flex",
              paddingLeft: 3,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <img
              src={brand}
              alt=""
              width={128}
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            />
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <Box
            flexGrow={1}
            display={"flex"}
            flexDirection={"column"}
            px={1}
            pt={5}
            bgcolor={theme.palette.primary.main}
            borderRadius={open ? 0 : 21}
          >
            <List sx={{ borderRadius: 21 }}>
              {drawerListItems?.map((data, index) => (
                <ListItem
                  key={index}
                  disablePadding
                  sx={{
                    display: "block",
                    ...(index === selectedIndex && activeRootStyle),
                  }}
                >
                  <MListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      my: 1,
                    }}
                    onClick={(e) => handlleItemClick(e, index, data?.route)}
                    selected={index === selectedIndex}
                  >
                    {/* <MListItemIcon> */}
                    {data?.key === "support" ? (
                      <img
                        src={data.icon}
                        alt=""
                        width={36}
                        style={{
                          marginLeft: -5,
                        }}
                      />
                    ) : (
                      <img
                        src={data.icon}
                        alt=""
                        style={{
                          marginRight: open ? 4 : 0,
                        }}
                      />
                    )}
                    {/* </MListItemIcon> */}

                    {open && <Box pr={data.key === "explore" ? 2 : 3} />}
                    <ListItemText
                      primary={data.title}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </MListItemButton>
                </ListItem>
              ))}
            </List>
            <br />
            <Divider />
            <br />
            <List>
              {drawerListItems2?.map((data, index) => (
                <ListItem key={index} disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    {data?.key === "support" ? (
                      <img
                        src={data.icon}
                        alt=""
                        width={36}
                        style={{
                          marginRight: open ? 4 : 0,
                        }}
                      />
                    ) : (
                      <img
                        src={data.icon}
                        alt=""
                        style={{
                          marginRight: open ? 4 : 0,
                        }}
                      />
                    )}

                    {open && <Box pr={data.key === "explore" ? 2 : 3} />}
                    <ListItemText
                      primary={data?.title}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Box
              height={"100%"}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <div>
                {open ? (
                  <RoundedButton startIcon={<Logout />}>Logout</RoundedButton>
                ) : (
                  <IconButton>
                    <Logout sx={{ color: "white" }} />
                  </IconButton>
                )}
              </div>
            </Box>
          </Box>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {deviceType === "pc" ? <DrawerHeader /> : <Toolbar />}
        <Outlet />
      </Box>
    </Box>
  );
}
