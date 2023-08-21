import { Box, Grid, Typography } from "@mui/material";
import ProfessionHeader from "../../layouts/headers/profession";
import CustomContainer from "../../components/container";
// import theme from "../../assets/theme/Theme";
import { useLocation } from "react-router-dom";
import theme from "../../assets/theme/Theme";


export default function Category() {
  let location = useLocation();
  const { data } = location?.state;

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <ProfessionHeader data={data} />
      <Box py={10}>
        <CustomContainer>
          <Box pt={4} display={"flex"} flexDirection={"column"}>
            <Typography
              gutterBottom
              variant="h4"
              fontWeight={600}
              width={"60%"}
            >
              {`Browse subcategories in ${data?.name ?? ""}`}
            </Typography>
          </Box>
          <Grid container spacing={2}>
            {data?.skills?.map((item: any, index: number) => (
              <Grid key={index} item xs={12} sm={3} md={4}>
                <Box
                  p={4}
                  textAlign={"center"}
                  borderRadius={6}
                  height={"100%"}
                  bgcolor={theme.palette.primary.light}
                >
                  <Typography>{item}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CustomContainer>
      </Box>
    </Box>
  );
}
