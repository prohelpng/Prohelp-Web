import { Box, Container, Grid, Typography, useMediaQuery } from "@mui/material";
import theme from "../../assets/theme/Theme";
import TaskAlt from "@mui/icons-material/TaskAlt";
import React from "react";

export default function BestPart() {
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
    <Box paddingY={deviceType === "pc" ? 16 : deviceType === "tablet" ? 12 : 8} bgcolor={theme.palette.primary.light}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
        }}
      >
        <Typography gutterBottom fontWeight={600} variant="h4">
          The Best Part of ProHelp
        </Typography>
        <Grid container spacing={2} mb={2} mt={1}>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <div>
              <Box
                display={"flex"}
                alignItems={"start"}
                flexDirection={"row"}
                justifyContent={"start"}
              >
                <TaskAlt />
                <Typography ml={2} fontWeight={600} fontSize={"1.1rem"}>
                  Stick to your budget
                </Typography>
              </Box>
              <Typography>
                Praesent ac eros nec purus faucibus fermentum. Integer at lorem
                nec erat placerat vulputate vel vel quam.
              </Typography>
            </div>

            <Box
              mt={2}
              display={"flex"}
              alignItems={"start"}
              flexDirection={"row"}
              justifyContent={"start"}
            >
              <TaskAlt />
              <Typography ml={2} fontWeight={600} fontSize={"1.1rem"}>
                Get quality work done quickly
              </Typography>
            </Box>
            <Typography>
              Praesent ac eros nec purus faucibus fermentum. Integer at lorem
              nec erat placerat vulputate vel vel quam.
            </Typography>

            <Box
              mt={2}
              display={"flex"}
              alignItems={"start"}
              flexDirection={"row"}
              justifyContent={"start"}
            >
              <TaskAlt />
              <Typography ml={2} fontWeight={600} fontSize={"1.1rem"}>
                Pay when you're satisfied
              </Typography>
            </Box>
            <Typography>
              Praesent ac eros nec purus faucibus fermentum. Integer at lorem
              nec erat placerat vulputate vel vel quam.
            </Typography>

            <Box
              mt={2}
              display={"flex"}
              alignItems={"start"}
              flexDirection={"row"}
              justifyContent={"start"}
            >
              <TaskAlt />
              <Typography ml={2} fontWeight={600} fontSize={"1.1rem"}>
                Count on 24/7 support
              </Typography>
            </Box>
            <Typography>
              Praesent ac eros nec purus faucibus fermentum. Integer at lorem
              nec erat placerat vulputate vel vel quam.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <video
              style={{ width: "100%", height: "100%" }}
              src="https://youtu.be/XLTzc3X-5pU"
              controls
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
