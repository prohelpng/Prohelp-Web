import { Box, Grid, Skeleton, Typography, useMediaQuery } from "@mui/material";
import { useAppSelector } from "../../utils/hooks/apphook";
import JobCard from "../../components/jobs/jobs_card";
import React from "react";
import theme from "../../assets/theme/Theme";
import CustomContainer from "../../components/container";
import JobShimmer from "../../components/skeleton/jobs_loader";

export default function PopularJobs() {
  const [isLoading, setLoading] = React.useState(true);
  const jobs = useAppSelector((state) => state.jobs.jobs);
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

  React.useEffect(() => {
    if (jobs !== null) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [jobs]);

  return (
    <Box
      paddingBottom={
        deviceType === "pc" ? 18 : deviceType === "tablet" ? 12 : 8
      }
      bgcolor={"white"}
    >
      <CustomContainer>
        <Typography gutterBottom fontWeight={600} variant="h4">
          Popular Jobs
        </Typography>
        <Grid container spacing={deviceType === "pc" ? 2 : 4}>
          {!isLoading
            ? jobs?.map((item: any, index: number) => (
                <Grid key={index} item xs={12} sm={6} md={4} lg={4} xl={3}>
                  <JobCard isLoading={isLoading} item={item} />
                </Grid>
              ))
            : (deviceType === "pc" ? [1, 2, 3, 4, 5, 6] : deviceType === "tablet" ? [1, 2, 3, 4] : [1, 2, 3]).map((item: any, index: number) => (
                <Grid key={index} item xs={12} sm={6} md={4} lg={4} xl={3}>
                  <JobShimmer />
                </Grid>
              ))}
        </Grid>
      </CustomContainer>
    </Box>
  );
}
