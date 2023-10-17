import {
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
import { useAppSelector } from "../../../utils/hooks/apphook";
import { useNavigate } from "react-router-dom";
import MyPostedJobCard from "../../../components/jobs/my_job_card";
import notfound from "../../../assets/images/empty.png";
import TabSection from "../explore/tab_section";

export default function Jobs(): React.JSX.Element {
  let theme = useTheme();
  const navigate = useNavigate();
  const [currProgress, setCurrProgress] = React.useState(0);

  const [deviceType, setDeviceType] = React.useState("mobile");

  const mobile = useMediaQuery(theme.breakpoints.only("xs"));
  const tablet = useMediaQuery(theme.breakpoints.only("sm"));

  const profile = useAppSelector((state) => state.auth.profile);
  const postedJobs = useAppSelector((state) => state.jobs.myPostedJobs);
  const jobs = useAppSelector((state) => state.jobs.jobs);

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
        <Grid item xs={12} sm={12} md={12}>
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
              {profile?.accountType === "recruiter"
                ? "Posted Jobs"
                : ""}
            </Typography>

            {profile?.accountType === "recruiter" ? (
              <>
                {" "}
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
                    height={
                      deviceType === "pc"
                        ? "70%"
                        : deviceType === "tablet"
                        ? "90%"
                        : "60%"
                    }
                  >
                    <img src={notfound} alt="" width={100} />
                    <Typography>You have not posted any job yet</Typography>
                  </Box>
                )}
              </>
            ) : (
             <TabSection/> 
            )}
          </Box>
        </Grid>
       
      </Grid>
    </Box>
  );
}
