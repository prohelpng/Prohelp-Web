import {
  Avatar,
  Box,
  Card,
  Grid,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import * as React from "react";
import RoundedButton from "../../../components/button/round_button";
import image from "../../../assets/images/illus.png";
import { useAppSelector } from "../../../utils/hooks/apphook";
import { NavLink, useNavigate } from "react-router-dom";
import { CustomLink } from "../../../layouts/navbars/main_navbar";
import LinearProgressLabel from "../../../components/progress/linear_progress";
import TabSection from "./tab_section";
import coins from "../../../assets/images/coin_gold.png";

export default function Explore(): React.JSX.Element {
  let theme = useTheme();
  const navigate = useNavigate();
  const [currProgress, setCurrProgress] = React.useState(0);
  const profile = useAppSelector((state) => state.auth.profile);

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

  const calculateProgress = async () => {};

  React.useEffect(() => {
    if (!profile?.hasProfile) {
      setCurrProgress(10);
    }
  }, []);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={9}>
          <Box
            px={deviceType === "pc" ? 6 : deviceType === "tablet" ? 4 : 2}
            py={deviceType === "pc" ? 4 : deviceType === "tablet" ? 3 : 2}
            bgcolor={theme.palette.primary.main}
            borderRadius={5}
            color={"white"}
          >
            <Grid
              container
              spacing={2}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={deviceType !== "pc" ? "center" : "space-between"}
              alignItems={"center"}
            >
              {deviceType !== "pc" && (
                <Grid item xs={12} sm={6} md={5}>
                  <img src={image} alt="" width={256} />
                </Grid>
              )}
              <Grid item xs={12} sm={6} md={7}>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={deviceType === "mobile" ? "center" : "start"}
                  alignItems={"center"}
                  pb={deviceType !== "pc" ? 2 : 0}
                >
                  <Typography
                    textAlign={deviceType === "mobile" ? "center" : "start"}
                    variant="h5"
                    gutterBottom
                  >
                    Get 80 Connects each month
                  </Typography>
                  <Typography variant="body2">
                    Join Freelancer Plus to start each month fresh with 80
                    Connects. You'll get a lot of other perks too! Join now to
                    unlock new features to help you grow your network and market
                    your skills.
                  </Typography>

                  <RoundedButton sx={{ mt: 3, height: 36 }}>
                    Learn more
                  </RoundedButton>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={5}
                display={{ xs: "none", sm: "none", md: "block" }}
              >
                <img src={image} alt="" width={256} />
              </Grid>
            </Grid>
          </Box>
          <Toolbar />
          <TabSection />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          sx={{ display: { xs: "none", sm: "none", md: "block" } }}
        >
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
                  src="https://pbs.twimg.com/profile_images/864104988146114560/MSWTWwno_400x400.jpg"
                />
              </Box>
              <Typography
                mt={2}
                color={theme.palette.primary.main}
                fontWeight={600}
              >
                {`${profile?.bio?.firstname} ${profile?.bio?.middlename} ${profile?.bio?.lastname}`}
              </Typography>
              <Typography gutterBottom variant="body2" color={"black"}>
                {`${profile?.email}`}
              </Typography>
              <Typography
                variant="body2"
                fontWeight={600}
                textTransform={"uppercase"}
                color={"primary"}
              >
                {`${profile?.accountType}`}
              </Typography>
            </Box>
            <Box
              bgcolor={"#0066f51d"}
              py={4}
              px={2}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"start"}
              alignItems={"start"}
            >
              <CustomLink
                sx={{
                  color: "black",
                  fontWeight: 600,
                  fontSize: 12,
                  textAlign: "start",
                }}
                to={""}
              >
                Profile Completeness:
              </CustomLink>
              <LinearProgressLabel progress={currProgress} />
              {profile?.accountType === "recruiter" && (
                <Box color={"black"}>
                  <Typography pt={4} variant="body2" gutterBottom>{`${
                    profile?.myJobs?.length < 1
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
                  <Typography>{`${profile?.wallet?.balance} coins`}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
