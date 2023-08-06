import React from "react";
import Box from "@mui/system/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import image from "../../assets/images/smiling_lady.png";
import SearchField from "../../components/inputs/search_field";
import useMediaQuery from "@mui/material/useMediaQuery";
import banner from "../../assets/images/banner.jpg";

export default function Header() {
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
      height={
        deviceType === "pc" ? "80vh" : deviceType === "tablet" ? "60vh" : "75vh"
      }
      marginTop={-8}
      sx={{
        backgroundImage: "url(" + banner + ")",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div
        style={{ width: "100%", height: "100%", backgroundColor: "#00000091" }}
      >
        <Container sx={{ height: "100%", zIndex: 1000 }}>
          <Grid
            sx={{ height: "100%" }}
            container
            spacing={2}
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} sm={12} md={6}>
              <Typography
                gutterBottom
                fontSize={"2rem"}
                component="h1"
                color="white"
                textAlign={"center"}
              >
                Find the right professional, for you
              </Typography>
              <SearchField />
            </Grid>
            {/* {deviceType === "pc" && (
            <Grid
              sx={{ height: "100%" }}
              item
              xs={12}
              sm={12}
              md={6}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"end"}
            >
              <img src={image} width="125%" alt="" />
            </Grid>
          )} */}
          </Grid>
        </Container>
      </div>
    </Box>
  );
}
