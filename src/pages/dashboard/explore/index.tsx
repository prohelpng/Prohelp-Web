import {
  Box,
  Grid,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import * as React from "react";
// import RoundedButton from "../../../components/button/round_button";
import image from "../../../assets/images/illus.png";
import giphy from "../../../assets/images/giphy.gif";
import { useAppSelector } from "../../../utils/hooks/apphook";
// import { useNavigate } from "react-router-dom";
// import Slider from "react-slick";
import Carousel from "react-material-ui-carousel";
import SearchField from "../../../components/inputs/search_field";
import TabSection from "../jobs/tab_section";

const tempSlides = [
  {
    title: "Find a Job at ease",
    image: image,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet.",
  },
  {
    title: "Get work done easily",
    image: giphy,
    description:
      "Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. ",
  },
];

export default function Explore(): React.JSX.Element {
  let theme = useTheme();
  // const navigate = useNavigate();

  // const customSlider: React.RefObject<Slider> = React.createRef();

  const [currProgress, setCurrProgress] = React.useState(0);
  const profile = useAppSelector((state) => state.auth.profile);

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

  // const calculateProgress = async () => {};

  React.useEffect(() => {
    if (!profile?.hasProfile) {
      setCurrProgress(10);
    }
  }, [profile?.hasProfile]);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <Box
            px={deviceType === "pc" ? 3 : deviceType === "tablet" ? 4 : 2}
            py={deviceType === "pc" ? 2 : deviceType === "tablet" ? 3 : 2}
            bgcolor={theme.palette.primary.main}
            borderRadius={5}
            color={"white"}
          >
            <Carousel>
              {tempSlides?.map((item: any) => (
                <Grid
                  key={item?.title}
                  container
                  spacing={2}
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={
                    deviceType !== "pc" ? "center" : "space-between"
                  }
                  alignItems={"center"}
                >
                  {deviceType !== "pc" && (
                    <Grid item xs={12} sm={6} md={5}>
                      <img src={item?.image} alt="" width={256} />
                    </Grid>
                  )}
                  <Grid item xs={12} sm={6} md={7}>
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={
                        deviceType === "mobile" ? "center" : "start"
                      }
                      alignItems={"start"}
                      pb={deviceType !== "pc" ? 2 : 0}
                    >
                      <Typography
                        textAlign={deviceType === "mobile" ? "left" : "start"}
                        variant="h5"
                        gutterBottom
                      >
                        {item?.title}
                      </Typography>
                      <Typography variant="body1">
                        {item?.description}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={5}
                    display={{ xs: "none", sm: "none", md: "flex" }}
                    flexDirection={"row"}
                    justifyContent={"end"}
                  >
                    <img src={item?.image} alt="" width={175} />
                  </Grid>
                </Grid>
              ))}
            </Carousel>
          </Box>
          <Toolbar />
          {/* Searh bar here! */}
          <SearchField
            placeholder={
              profile?.accountType !== "recruiter"
                ? "Search for available jobs here"
                : "Search for talents here"
            }
            from="explore"
          />
          <br />
          <TabSection />
        </Grid>
      </Grid>
    </Box>
  );
}
