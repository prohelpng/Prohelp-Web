import {
  Box,
  Card,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import SearchField from "../../../components/inputs/search_field";
import { useAppSelector } from "../../../utils/hooks/apphook";

export default function AccountSearchResultsPage() {
  const [deviceType, setDeviceType] = React.useState("mobile");

  const theme = useTheme();

  const mobile = useMediaQuery(theme.breakpoints.only("xs"));
  const tablet = useMediaQuery(theme.breakpoints.only("sm"));

  const profile = useAppSelector((state) => state.auth.profile);

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
    <Grid container spacing={2} display={"flex"} flexDirection={"row"}>
      {deviceType === "pc" ? (
        <Grid item xs={12} md={4} lg={3}>
          <Box p={2} component={Card} position={"fixed"} border={'none'} boxShadow={'rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;'} >
            <Typography
              fontSize={24}
              fontWeight={900}
              mr={8}
              color={theme.palette.primary.dark}
            >
              Filter By
            </Typography>
          </Box>
        </Grid>
      ) : (
        <Grid
          item
          xs={12}
          md={4}
          lg={3}
          sx={{
            position: "sticky",
          }}
        >
          <Box p={2}>
            <Typography>Filter</Typography>
          </Box>
        </Grid>
      )}

      <Grid item xs={12} md={8} lg={9} flex={1}>
        <Box display={"flex"} flexDirection={"column"} justifyContent={"start"}>
          <SearchField
            placeholder={
              profile?.accountType !== "recruiter"
                ? "Search for available jobs here"
                : "Search for talents here"
            }
          />
        </Box>
      </Grid>
    </Grid>
  );
}
