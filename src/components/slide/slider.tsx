import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Box from "@mui/material/Box";
import { cards } from "../../utils/data/data";
import CategoryCard from "../category/category_card";
import theme from "../../assets/theme/Theme";
import { Typography, useMediaQuery } from "@mui/material";
import CustomContainer from "../container";

const Slide = () => {
  const [deviceType, setDeviceType] = React.useState("mobile");

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
    dots: true,
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
      <CustomContainer>
        <Typography gutterBottom fontWeight={600} variant="h4">
          Popular Services
        </Typography>
        <Slider {...settings} className="innerSlide">
          {cards.map((item) => (
            <CategoryCard key={item.id} item={item} />
          ))}
        </Slider>
      </CustomContainer>
    </Box>
  );
};

export default Slide;
