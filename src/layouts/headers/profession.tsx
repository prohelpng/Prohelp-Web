import { Box, Grid, Typography } from "@mui/material";
import theme from "../../assets/theme/Theme";
import image from "../../assets/images/demo_img.jpeg";
import RoundedButton from "../../components/button/round_button";
import CustomContainer from "../../components/container";

export default function ProfessionHeader(): React.JSX.Element {
  return (
    <Box bgcolor={theme.palette.primary.main} padding={theme.spacing(2)}>
      <CustomContainer  > 
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} color={"white"} pr={4} width={"75%"}>
            <Typography gutterBottom variant="h3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </Typography>
            <Typography gutterBottom variant="body2">
              Sed fringilla lectus euismod, sagittis enim ac, suscipit odio.
              Duis euismod, ipsum eu efficitur euismod, leo magna congue nulla,
              vel varius est ligula a mauris. Donec at ipsum ac nisi tincidunt
              faucibus
            </Typography>

            <Box display={"flex"} flexDirection={"row"} pt={2} pb={8}  > 
              <RoundedButton sx={{width: 144}} >Get Started</RoundedButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} p={theme.spacing(1)}>
            <img
              src={image}
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
