import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";

import { Outlet, useLocation, useNavigate } from "react-router-dom";

import {
  Avatar,
  Card,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import RoundedButton from "../../components/button/round_button";
// import MaterialSearchbar from "../../components/inputs/material_search";

import { useAppDispatch, useAppSelector } from "../../utils/hooks/apphook";
import { setAuth, setProfile } from "../../redux/reducers/auth";
import { setLoading } from "../../redux/reducers/loader";
import { toast } from "react-hot-toast";
import CustomContainer from "../../components/container";
import ProfessionalNavbar from "../navbars/professional_navbar";
import RecruiterNavbar from "../navbars/recruiter_navbar";
// import { CustomLink } from "../navbars/main_navbar";
import LinearProgressLabel from "../../components/progress/linear_progress";
import coins from "../../assets/images/coin_gold.png";



export default function DashbboardLayout() {
  const theme = useTheme();
  const navigate = useNavigate();
  const currlocation = useLocation();
  const [currProgress, setCurrProgress] = React.useState(0);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  // const [selectedIndex, setSelectedIndex] = React.useState(0);
  // const [open, setOpen] = React.useState(true);
  const [deviceType, setDeviceType] = React.useState("mobile");

  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const userProfile = useAppSelector((state) => state.auth.profile);

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

  // const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
  //   null
  // );

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

  React.useEffect(() => {
    if (currlocation.pathname === "/dashboard/explore") {
      setSelectedIndex(0);
    } else if (currlocation.pathname === "/dashboard/jobs") {
      setSelectedIndex(1);
    } else if (currlocation.pathname === "/dashboard/message") {
      setSelectedIndex(2);
    } else if (currlocation.pathname === "/dashboard/account") {
      setSelectedIndex(5);
    }
  }, [currlocation]);

  const handlleItemClick = (
    e: React.MouseEvent<HTMLElement>,
    index: number,
    route: string
  ) => {
    setSelectedIndex(index);
    navigate(route);
  };



  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* {deviceType !== "pc" && (
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
      )} */}

      {isAuth &&
      userProfile &&
      userProfile?.accountType?.toLowerCase() !== "recruiter" ? (
        <ProfessionalNavbar />
      ) : (
        <RecruiterNavbar />
      )}

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {<Toolbar />}
        <CustomContainer>
          <Grid container spacing={2}>
            <Grid
              item
              sm={12}
              md={currlocation.pathname === "/dashboard/account" ? 12 : 9}
            >
              <Outlet />
            </Grid>
            <Grid
              item
              md={3}
              sx={{
                display: {
                  sm: "none",
                  xs: "none",
                  md:
                    currlocation.pathname === "/dashboard/account"
                      ? "none"
                      : "block",
                },
              }}
            >
              <Box position={"fixed"} minWidth={320}>
                <Card sx={{ borderRadius: 2 }}>
                  <Box
                    px={4}
                    pt={4}
                    pb={2}
                    bgcolor={"#fff"}
                    color={"white"}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Box
                      borderRadius={36}
                      width={72}
                      height={72}
                      bgcolor={theme.palette.primary.main}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        sx={{ width: 70, height: 70 }}
                        src={userProfile?.bio?.image}
                      />
                    </Box>
                    <Typography
                      mt={2}
                      color={theme.palette.primary.main}
                      fontWeight={900}
                    >
                      {`${userProfile?.bio?.firstname} ${userProfile?.bio?.middlename} ${userProfile?.bio?.lastname}`}
                    </Typography>
                    <Typography gutterBottom variant="body2" color={"black"}>
                      {`${userProfile?.email}`}
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      textTransform={"uppercase"}
                      color={"primary"}
                    >
                      {`${userProfile?.accountType}`}
                    </Typography>
                  </Box>
                  <Box
                    bgcolor={"#0066f51d"}
                    py={3}
                    px={2}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"start"}
                    alignItems={"start"}
                  >
                    <Typography
                      sx={{
                        color: "black",
                        fontWeight: 600,
                        fontSize: 12,
                        textAlign: "start",
                      }}
                    >
                      Profile Completeness:
                    </Typography>
                    <LinearProgressLabel progress={currProgress} />
                    {userProfile?.accountType === "recruiter" && (
                      <Box color={"black"}>
                        <Typography pt={4} variant="body2" gutterBottom>{`${
                          userProfile?.myJobs?.length < 1
                            ? "You have not posted any jobs yet. Click on the button below to start posting jobs "
                            : ""
                        }`}</Typography>
                        <RoundedButton
                          sx={{
                            backgroundColor: theme.palette.primary.main,
                            color: "white",
                            height: 36,
                            mt: 2,
                          }}
                          fullWidth
                          onClick={() => navigate("/dashboard/jobs")}
                        >
                          Post Job
                        </RoundedButton>
                      </Box>
                    )}
                  </Box>
                  <Box
                    p={2}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"start"}
                    alignItems={"stretch"}
                  >
                    <Box
                      py={1}
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Typography>Connections</Typography>
                      <Typography>
                        {userProfile?.connections?.length}
                      </Typography>
                    </Box>
                    <Divider />
                    <Box
                      py={1}
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Typography>Saved Jobs</Typography>
                      <Typography>{userProfile?.savedJobs?.length}</Typography>
                    </Box>
                  </Box>
                </Card>

                <Card sx={{ mt: 1, borderRadius: 2 }}>
                  <Box
                    py={4}
                    px={2}
                    width={"100%"}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"start"}
                    alignItems={"start"}
                  >
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      textAlign={"center"}
                      textTransform={"uppercase"}
                      color={"primary"}
                      gutterBottom={true}
                    >
                      My Wallet
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6} sm={6}>
                        <img src={coins} alt="" width={"40%"} />
                        <Typography>{`${userProfile?.wallet?.balance} coins`}</Typography>
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <Box>
                          <RoundedButton
                            sx={{
                              bgcolor: theme.palette.primary.main,
                              color: "white",
                            }}
                            fullWidth
                          >
                            Topup Wallet
                          </RoundedButton>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </CustomContainer>
      </Box>
    </Box>
  );
}
