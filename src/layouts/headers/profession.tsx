import { Box, Grid, Typography } from "@mui/material";
import theme from "../../assets/theme/Theme";
import image from "../../assets/images/demo_img.jpeg";
import RoundedButton from "../../components/button/round_button";
import CustomContainer from "../../components/container";

interface Props {
  data: any;
}

export default function ProfessionHeader(props: Props): React.JSX.Element {
  const { data } = props;

  return (
    <Box bgcolor={theme.palette.primary.main} padding={theme.spacing(2)}>
      <CustomContainer>
        <Grid
          container
          spacing={2}
          display="flex"
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Grid item xs={12} sm={6} color={"white"} pr={4} width={"75%"}>
            <Typography gutterBottom variant="h3">
              Explore {data?.name} Services
            </Typography>
            <Typography gutterBottom variant="body2">
              {data?.description}
            </Typography>

            <Box display={"flex"} flexDirection={"row"} pt={2} pb={8}>
              <RoundedButton sx={{ width: 144 }}>Get Started</RoundedButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} p={theme.spacing(1)}>
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
