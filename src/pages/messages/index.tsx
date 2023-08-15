import {
  Box,
  Card,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import theme from "../../assets/theme/Theme";
import { useAppSelector } from "../../utils/hooks/apphook";
import { SearchFieldTop } from "../../components/inputs/search_field";

import notfound from "../../assets/images/empty.png";

export default function MessageCenter() {
  const [deviceType, setDeviceType] = React.useState("mobile");

  const conversations = useAppSelector((state) => state.messages.conversations);

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
    <Box height={"86vh"}>
      {deviceType === "pc" && (
        <Grid container spacing={1} height={"100%"}>
          <Grid item md={4} height={"100%"}>
            <Box
              height={"100%"}
              component={Card}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"start"}
              alignItems={"start"}
              padding={2}
            >
              <Box
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"start"}
                alignItems={"center"}
              >
                <Typography fontWeight={500} fontSize={"1.1rem"}>
                  Messages
                </Typography>
                <SearchFieldTop />
              </Box>
              <Divider />
              <Box
                width={"100%"}
                flex={1}
                display={"flex"}
                flexDirection={"column"}
              >
                {conversations?.length > 0 ? (
                  <></>
                ) : (
                  <Box
                    height={"100%"}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <img src={notfound} alt="" width={100} />
                    <Typography>No conversations found</Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item md={8}>
            {" "}
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
