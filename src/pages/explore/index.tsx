import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import ExploreHeader from "../../layouts/headers/explore";
import { useAppSelector } from "../../utils/hooks/apphook";
import ProCard from "../../components/professional/pro_card";
import theme from "../../assets/theme/Theme";
import CustomContainer from "../../components/container";

export default function ExplorePro(): React.JSX.Element {
  const professionals = useAppSelector((state) => state.users.professionals);
  const [deviceType, setDeviceType] = React.useState("mobile");
  // const [isFixed, setFixed] = React.useState(false);

  const mobile = useMediaQuery(theme.breakpoints.only("xs"));
  const tablet = useMediaQuery(theme.breakpoints.only("sm"));

  // const scrollHandler = () => {
  //   if (window.scrollY >= 500) {
  //     setFixed(true);
  //   } else {
  //     setFixed(false);
  //   }
  // };

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
    <Box>
      <ExploreHeader />
      <Box
        paddingY={deviceType === "pc" ? 16 : deviceType === "tablet" ? 12 : 8}
        // bgcolor={"#efefef"}
      >
        <CustomContainer>
          <Grid container spacing={2}>
            <Grid flex={1} flexGrow={1} item xs={12} sm={12} md={12} lg={12}>
              <Box>
                <Typography
                  fontWeight={600}
                  variant={deviceType === "pc" ? "h4" : "h6"}
                >
                  Our Top Professionals
                </Typography>
                <Grid container spacing={2}>
                  {professionals &&
                    professionals?.map((item: any) => (
                      <Grid item xs={12} sm={6} md={6} lg={3}>
                        <ProCard
                          data={item}
                          height={
                            deviceType === "pc"
                              ? 375
                              : deviceType === "tablet"
                              ? 328
                              : 310
                          }
                        />
                      </Grid>
                    ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </CustomContainer>
      </Box>
    </Box>
  );
}
