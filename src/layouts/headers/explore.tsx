import { Box, Container, Grid, Typography, useMediaQuery } from "@mui/material";
import image from "../../assets/images/xpl.png";
import React from "react";
import theme from "../../assets/theme/Theme";

export default function ExploreHeader() {
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
    <Box py={4} height={"75%"} bgcolor={"white"}>
      <Container>
        <Grid
          container
          spacing={2}
          color={"black"}
          display={"flex"}
          flexDirection="row"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Grid item xs={12} sm={7} md={6} lg={5}>
            <Typography
              variant={deviceType === "pc" ? "h2" : "h4"}
              fontWeight={600}
              gutterBottom
              lineHeight={1.1}
            >
              Explore our top talents now
            </Typography>
            <Typography>
              Learn about working with talent or explore your specific hiring
              needs.
            </Typography>
          </Grid>
          <Grid
            sx={{ display: { xs: "none", sm: "block", md: "block" } }}
            item
            xs={12}
            sm={5}
            md={6}
            lg={5}
          >
            <img src={image} alt="" width={"100%"} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
