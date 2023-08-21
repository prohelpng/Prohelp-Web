import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
// import slickPrev from "react-slick";
import Box from "@mui/material/Box";
import { cards } from "../../utils/data/data";
import CategoryCard from "../category/category_card";
import theme from "../../assets/theme/Theme";
import {
  Container,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
// import CustomContainer from "../container";

const Slide = () => {
  const [deviceType, setDeviceType] = React.useState("mobile");
  const customSlider: React.RefObject<Slider> = React.createRef();
  const mobile = useMediaQuery(theme.breakpoints.only("xs"));
  const tablet = useMediaQuery(theme.breakpoints.only("sm"));
  const tabletBig = useMediaQuery(theme.breakpoints.only("md"));

  React.useEffect(() => {
    if (mobile) {
      setDeviceType("mobile");
    } else if (tablet) {
      setDeviceType("tablet");
    } else if (tabletBig) {
      setDeviceType("tabletBig");
    } else {
      setDeviceType("pc");
    }
  }, [mobile, tablet, tabletBig]);

  var settings = {
    dots: false,
    infinite: true,
    autoPlay: true,
    speed: 500,
    slidesToShow:
      deviceType === "mobile"
        ? 1
        : deviceType === "tablet"
        ? 2
        : deviceType === "tabletBig"
        ? 3
        : 4,
    slidesToScroll: 1,
  };

  return (
    <Box
      paddingY={deviceType === "pc" ? 18 : deviceType === "tablet" ? 14 : 10}
      bgcolor={"white"}
    >
      <Container>
        <Typography gutterBottom fontWeight={600} variant="h4">
          Popular Services
        </Typography>
        <Box position={"relative"}>
          <Slider {...settings} ref={customSlider}>
            {cards.map((item) => (
              <CategoryCard key={item.id} item={item} />
            ))}
          </Slider>
          <Box
            position={"absolute"}
            top={144}
            bottom={144}
            width={"100%"}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <IconButton
              sx={{
                bgcolor: theme.palette.primary.main,
                color: "white",
              }}
              onClick={() => customSlider?.current?.slickPrev()}
            >
              <ArrowBackIosNew />
            </IconButton>

            <IconButton
              sx={{
                bgcolor: theme.palette.primary.main,
                color: "white",
              }}
              onClick={() => customSlider?.current?.slickNext()}
            >
              <ArrowForwardIos />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Slide;
