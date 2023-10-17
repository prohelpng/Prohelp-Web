import {
  Box,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ContactForm from "../../components/forms/contact_form";
import image from "../../assets/images/contactus.svg";
import React from "react";
import theme from "../../assets/theme/Theme";
import CustomContainer from "../../components/container";

export default function ContactUs() {
  const embedUrlLeft = "https://maps.google.com/maps?q=";
  const embedUrlRight = "&t=&z=13&ie=UTF8&iwloc=&output=embed";
  let address = "Thera Annex, Lekki-Ajah";

  const [deviceType, setDeviceType] = React.useState("mobile");

  const mobile = useMediaQuery(theme.breakpoints.only("xs"));
  const tablet = useMediaQuery(theme.breakpoints.only("sm"));

  React.useEffect(() => {
    if (mobile) {
      setDeviceType("mobile");
    } else if (tablet) {
      setDeviceType("mobile");
    } else {
      setDeviceType("pc");
    }
  }, [mobile, tablet]);

  return (
    <Box pb={6} pt={4}>
      <CustomContainer>
        <Box
          pb={6}
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"start"}
          alignItems={"center"}
        >
          <Typography variant="h4" component={"h1"} fontWeight={600}>
            Have Any Questions?
          </Typography>
          <Typography variant="body2">
            Contact us. We're glad to hear from you.
          </Typography>
        </Box>
        <Grid
          container
          spacing={2}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Grid item xs={12} sm={12} md={5} lg={6}>
            <img src={image} alt="" width={"96%"} />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={7}
            lg={6}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"end"}
          >
            <Box width={deviceType === "pc" ? "80%" : "100%"}>
              <ContactForm />
            </Box>
          </Grid>
        </Grid>
        <Box my={deviceType === "pc" ? 12 : 6} py={2}>
          <Typography
            gutterBottom
            variant="h4"
            component={"h1"}
            fontWeight={"600"}
          >
            Our Office Address
          </Typography>
          <iframe
            title="turF"
            width="100%"
            height="500"
            id="gmap_canvas"
            frameBorder="0"
            scrolling="no"
            src={embedUrlLeft + address + embedUrlRight}
          />
        </Box>
      </CustomContainer>
    </Box>
  );
}
