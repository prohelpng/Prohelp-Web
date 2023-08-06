import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useMediaQuery } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import GppGoodIcon from "@mui/icons-material/GppGood";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import theme from "../../assets/theme/Theme";

export default function WhyPrpohelp(): React.JSX.Element {
  //   const theme = useTheme();
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
    <Box
      paddingY={deviceType === "pc" ? 16 : deviceType === "tablet" ? 12 : 8}
    >
      <Container>
        <Grid
          container
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Grid item xs={12} sm={7} md={7} lg={8} padding={1}>
            <Box p={4} borderRadius={4} bgcolor={theme.palette.primary.light}>
              <Typography
                variant={
                  deviceType === "pc"
                    ? "h1"
                    : deviceType === "tablet"
                    ? "h3"
                    : "h4"
                }
                fontSize={
                  deviceType === "pc"
                    ? "4rem"
                    : deviceType === "tablet"
                    ? "3rem"
                    : "2rem"
                }
                fontWeight={600}
                gutterBottom={true}
              >
                Why businesses turn to ProHelp
              </Typography>
              <Box
                py={2}
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"start"}
                alignItems={"start"}
              >
                <TaskAltIcon />
                <Box px={1} mt={-1}>
                  <Typography fontWeight={600} fontSize={24}>
                    Proof of quality
                  </Typography>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    non risus erat.Fusce eget nunc nec dolor tempus tristique eu
                    vel magna. Quisque laoreet augue vitae aliquet tincidunt.
                    Integer a purus ut odio convallis sagittis.
                  </Typography>
                </Box>
              </Box>

              <Box
                py={2}
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"start"}
                alignItems={"start"}
              >
                <GppGoodIcon />
                <Box px={1} mt={-1}>
                  <Typography fontWeight={600} fontSize={24}>
                    Safe and secure
                  </Typography>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    non risus erat. Nullam non mattis justo. Fusce eget nunc nec
                    dolor tempus tristique eu vel.
                  </Typography>
                </Box>
              </Box>

              <Box
                py={2}
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"start"}
                alignItems={"start"}
              >
                <BuildCircleIcon />
                <Box px={1} mt={-1}>
                  <Typography fontWeight={600} fontSize={24}>
                    Trusted by leading brands
                  </Typography>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    non risus erat. Nullam non mattis justo. Fusce eget nunc nec
                    dolor tempus tristique eu vel magna. Quisque laoreet augue
                    vitae aliquet tincidunt.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={5} md={5} lg={4} p={1}>
            <Box
              p={4}
              height={"100%"}
              color={"white"}
              borderRadius={4}
              display={"flex"}
              alignItems={"center"}
              flexDirection={"column"}
              justifyContent={"end"}
              bgcolor={theme.palette.primary.main}
            >
              <Box
                height={"75%"}
                display={"flex"}
                alignItems={"center"}
                flexDirection={"column"}
                justifyContent={"end"}
                pb={2}
              >
                <Typography variant="h4" fontWeight={600} gutterBottom>
                  We're No1 in credibility and reliability.
                </Typography>
                <Typography>
                  Prohelp was developed to solve identity verification problem
                  faced by other platforms
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
