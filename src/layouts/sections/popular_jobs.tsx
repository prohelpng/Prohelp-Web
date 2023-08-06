import { Box, Container, Grid, Typography, useMediaQuery } from "@mui/material";
import { useAppSelector } from "../../utils/hooks/apphook";
import JobCard from "../../components/jobs/jobs_card";
import React from "react";
import theme from "../../assets/theme/Theme";

export default function PopularJobs() {
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

  return (
    <Box paddingBottom={deviceType === "pc" ? 18 : deviceType === "tablet" ? 12 : 8} bgcolor={"white"}>
      <Container>
        <Typography gutterBottom fontWeight={600} variant="h4">
          Popular Jobs
        </Typography>
        <Grid container spacing={2}>
          {jobs &&
            jobs?.map((item: any, index: number) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={4} xl={3}>
                <JobCard item={item} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </Box>
  );
}
