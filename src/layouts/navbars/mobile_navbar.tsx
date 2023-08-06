import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";

import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../utils/hooks/apphook";
import {
  AccountCircle,
  CardTravel,
  Dashboard,
  Message,
  Notifications,
} from "@mui/icons-material";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

export default function MobileNavbar() {
  const navigate = useNavigate();

  const isAuth = useAppSelector((state) => state.auth.isAuth);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          top: "auto",
          bottom: 0,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}
      >
        <Toolbar>
          <Box
            width={"100%"}
            height={"100%"}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Button variant="text" sx={{ height: "100%" }}>
              <Box
                width={40}
                height={"100%"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography color={"white"} textTransform={"capitalize"}>
                  Explore
                </Typography>
              </Box>
            </Button>

            <Button variant="text" sx={{ height: "100%" }}>
              <Box
                width={40}
                height={"100%"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography
                  gutterBottom
                  color={"white"}
                  textTransform={"capitalize"}
                >
                  Jobs
                </Typography>
              </Box>
            </Button>

            <Button
              variant="text"
              sx={{ height: "100%" }}
              onClick={() => navigate("/login")}
            >
              <Typography
                gutterBottom
                color={"white"}
                textTransform={"capitalize"}
              >
                {isAuth ? "" : "Sign in"}
              </Typography>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export function MobileAuthNavbar() {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          top: "auto",
          bottom: 0,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}
      >
        <Toolbar>
          <Box
            width={"100%"}
            height={"100%"}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Button
              variant="text"
              sx={{ height: "100%" }}
              onClick={() => navigate("/dashboard/explore")}
            >
              <Box
                width={40}
                height={56}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Dashboard sx={{ color: "white" }} />
                <Typography color={"white"} textTransform={"capitalize"}>
                  Explore
                </Typography>
              </Box>
            </Button>

            <Button
              variant="text"
              sx={{ height: "100%" }}
              onClick={() => navigate("/dashboard/jobs")}
            >
              <Box
                width={40}
                height={56}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <CardTravel sx={{ color: "white" }} />
                <Typography
                  gutterBottom
                  color={"white"}
                  textTransform={"capitalize"}
                >
                  Jobs
                </Typography>
              </Box>
            </Button>

            <Button
              variant="text"
              sx={{ height: "100%" }}
              onClick={() => navigate("/")}
            >
              <Box
                width={40}
                height={56}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Message sx={{ color: "white" }} />
                <Typography
                  gutterBottom
                  color={"white"}
                  textTransform={"capitalize"}
                >
                  Messages
                </Typography>
              </Box>
            </Button>

            <Button
              variant="text"
              sx={{ height: "100%" }}
              onClick={() => navigate("/")}
            >
              <Box
                width={40}
                height={56}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Notifications sx={{ color: "white" }} />
                <Typography
                  gutterBottom
                  color={"white"}
                  textTransform={"capitalize"}
                >
                  Alerts
                </Typography>
              </Box>
            </Button>

            <Button
              variant="text"
              sx={{ height: "100%" }}
              onClick={() => navigate("/")}
            >
              <Box
                width={40}
                height={56}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <AccountCircle sx={{ color: "white" }} />
                <Typography
                  gutterBottom
                  color={"white"}
                  textTransform={"capitalize"}
                >
                  Account
                </Typography>
              </Box>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
