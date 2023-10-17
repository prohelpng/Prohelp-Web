import { Box, Grid, Typography } from "@mui/material";
import theme from "../../assets/theme/Theme";
// import image from "../../assets/images/demo_img.jpeg";
import RoundedButton from "../../components/button/round_button";
import CustomContainer from "../../components/container";

interface Props {
  data: any;
  deviceType: string;
}

export default function ProfessionHeader(props: Props): React.JSX.Element {
  const { data, deviceType } = props;

  return (
    <Box
      bgcolor={deviceType !== "pc" ? "transparent" : theme.palette.primary.main}
      sx={{
        backgroundImage: deviceType !== "pc" ? "url(" + data?.image + ")" : "",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      padding={theme.spacing(2)}
      position={'relative'}
    >
      {
        deviceType !== "pc" && <Box width={'100%'} height={'100%'} bgcolor={'#00000087'} position={'absolute'} top={0} left={0} right={0} />
      }
      <CustomContainer >
        <Grid
          container
          spacing={2}
          display="flex"
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Grid item xs={12} sm={6} color={"white"} pr={4} width={ deviceType !== "pc" ? "96%" : "75%"} zIndex={10} >
            <Box maxWidth={420}>
              {
                deviceType !== "pc" ? <br /> : <></>
              }
              <Typography gutterBottom variant={deviceType !== "pc" ? "h4" : "h3"}>
                Explore {data?.name === "electrician"} Services
              </Typography>
              <Typography gutterBottom variant="body1">
                {data?.description}
              </Typography>

              <Box display={"flex"} flexDirection={"row"} pt={2} pb={8}>
                <RoundedButton sx={{ width: 144 }}>Get Started</RoundedButton>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            p={theme.spacing(1)}
            sx={{ display: { xs: "none", sm: "none", md: "block" } }}
          >
            <img
              src={data?.image}
              alt=""
              style={{ borderRadius: 10 }}
              width={"100%"}
              height={"100%"}
            />
          </Grid>
        </Grid>
      </CustomContainer>
    </Box>
  );
}
