import {
  Avatar,
  Box,
  Card,
  Grid,
  List,
  ListItem,
  ListItemButton,
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
import MyPostedJobCard from "../../../components/jobs/my_job_card";
import notfound from "../../../assets/images/empty.png";

export default function Jobs(): React.JSX.Element {
  let theme = useTheme();
  const navigate = useNavigate();
  const [currProgress, setCurrProgress] = React.useState(0);
  const profile = useAppSelector((state) => state.auth.profile);

  const [deviceType, setDeviceType] = React.useState("mobile");

  const mobile = useMediaQuery(theme.breakpoints.only("xs"));
  const tablet = useMediaQuery(theme.breakpoints.only("sm"));

  const postedJobs = useAppSelector((state) => state.jobs.myPostedJobs);

  React.useEffect(() => {
    if (mobile) {
      setDeviceType("mobile");
    } else if (tablet) {
      setDeviceType("tablet");
    } else {
      setDeviceType("pc");
    }
  }, [mobile, tablet]);

  //   console.log("PRofile :: ", postedJobs?.length);

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
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={deviceType === "mobile" ? "center" : "start"}
              alignItems={deviceType === "mobile" ? "center" : "start"}
              pb={deviceType !== "pc" ? 2 : 0}
            >
              <Typography
                textAlign={deviceType === "mobile" ? "center" : "start"}
                variant="h5"
                gutterBottom
              >
                Lorem ipsum dolor sit amet
              </Typography>
              <Typography variant="body2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                nec purus urna. Sed eget semper dolor, id venenatis quam.
                Maecenas id justo nec turpis
              </Typography>
            </Box>
          </Box>
          <Toolbar />
          <Box height={"100%"}>
            <Typography gutterBottom fontWeight={600} fontSize={"1.25rem"}>
              Posted Jobs
            </Typography>

            {postedJobs && postedJobs?.length > 0 ? (
              <List>
                {postedJobs?.map((item: any, key: number) => (
                  <ListItem key={key}>
                    <ListItemButton>
                      <MyPostedJobCard data={item} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                height={deviceType === "pc" ? "70%": deviceType === "tablet" ? "90%" : "60%"}
              >
                <img src={notfound} alt="" width={100} />
                <Typography>You have not posted any job yet</Typography>
              </Box>
            )}
          </Box>
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
              pt={3}
              pb={2}
              bgcolor={"#fff"}
              color={"white"}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography
                variant="body1"
                gutterBottom={true}
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
              {profile?.accountType === "recruiter" ? (
                <Box color={"black"}>
                  <Typography variant="body2" gutterBottom>{`${
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
              ) : (
                <Box>Migos ma</Box>
              )}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
