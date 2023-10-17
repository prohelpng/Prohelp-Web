import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import Popper, { PopperPlacementType } from "@mui/material/Popper";

import {
  Fade,
  IconButton,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../utils/hooks/apphook";
import {
  AccountCircle,
  CardTravel,
  Category,
  Dashboard,
  Message,
  Notifications,
} from "@mui/icons-material";
import MobilePopper from "../../components/popper/mobile_category_popper";
import { CategoryLink } from "./main_navbar";

interface CustomLinkProps {
  children: React.ReactNode;
}

export const MobileCustomLink = styled(NavLink)<CustomLinkProps>(
  ({ theme }) => ({
    color: "grey",
    padding: "8px",
    textDecoration: "none",
    margin: "10px",
    "&:hover": {
      color: theme.palette.primary.main,
    },
    "&.active": {
      color: theme.palette.primary.main,
    },
  })
);

export default function MobileNavbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState<PopperPlacementType>();

  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const professions = useAppSelector((state) => state.professions.professions);

  const handleClick =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };

  return (
    <React.Fragment>
      <CssBaseline />
      {/* <MobilePopper open={open} placement={placement} anchorEl={anchorEl} /> */}
      <Popper open={open} anchorEl={anchorEl} placement={placement} transition sx={{zIndex: 500}} >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"start"}
                alignItems={"end"}
              >
                {(professions ?? [])?.map((item: any, index: number) => (
                  <ListItem key={index} divider disableGutters disablePadding>
                    <CategoryLink
                      onClick={() => {
                        setOpen(false);
                        navigate(
                          "/category/" +
                            item?.name?.replaceAll(" ", "")?.toLowerCase(),
                          { state: { data: item } }
                        );
                      }}
                      sx={{ color: "black" }}
                    >
                      {item?.name}
                    </CategoryLink>
                  </ListItem>
                ))}
              </Box>
            </Paper>
          </Fade>
        )}
      </Popper>
      <AppBar
        position="fixed"
        sx={{
          top: "auto",
          bottom: 0,
          bgcolor: "white",
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
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
            <MobileCustomLink to={"/"}>Home</MobileCustomLink>
            {/* <Button
              variant="text"
              sx={{ height: "100%" }}
              onClick={() => navigate("/")}
            >
              <Box
                width={40}
                height={"100%"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography color={"white"} textTransform={"capitalize"}>
                  Home
                </Typography>
              </Box>
            </Button> */}

            <MobileCustomLink to={"/explore"}>Explore</MobileCustomLink>

            <MobileCustomLink to={"/signup/recruiter"}>
              Hire skill
            </MobileCustomLink>

            <Box>
              <IconButton onClick={handleClick("bottom")}>
                <Category />
              </IconButton>
              {/*  */}
            </Box>
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
