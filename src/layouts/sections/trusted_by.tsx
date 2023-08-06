import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import React from "react";
import metaIcon from "../../assets/images/meta.png";
import googleIcon from "../../assets/images/google.png";
import paypalIcon from "../../assets/images/paypal.png";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function TrustedBy(): React.JSX.Element {
  const [deviceType, setDeviceType] = React.useState("mobile");

  const theme = useTheme();
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
  }, []);

  return (
    <Box
      bgcolor={"#e8e8e8"}
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Container>
        <Box
          paddingX={deviceType === "pc" ? 10 : 1}
          paddingY={deviceType === "pc" ? 5 : 1}
          width={"100%"}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid
            width={"100%"}
            container
            spacing={2}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            {deviceType === "pc" && (
              <Grid item xs={12} sm={4} md={2}>
                <Typography variant="h6" color={"grey"}>
                  Trusted By:
                </Typography>
              </Grid>
            )}
            <Grid item xs={4} sm={3} md={2}>
              <img src={googleIcon} alt="" width={75} />
            </Grid>
            <Grid item xs={4} sm={3} md={2}>
              <img src={metaIcon} alt="" width={75} />
            </Grid>
            <Grid item xs={4} sm={3} md={2}>
              <img src={paypalIcon} alt="" width={75} />
            </Grid>
            {deviceType !== "mobile" && (
              <Grid item xs={4} sm={3} md={2}>
                <img src={metaIcon} alt="" width={75} />
              </Grid>
            )}
            {deviceType === "pc" && (
              <Grid item xs={4} sm={3} md={2}>
                <img src={googleIcon} alt="" width={75} />
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
