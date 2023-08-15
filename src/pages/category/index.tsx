import { Box, Typography } from "@mui/material";
import ProfessionHeader from "../../layouts/headers/profession";
import CustomContainer from "../../components/container";

export default function Category() {
  return (
    <Box display={"flex"} flexDirection={"column"}>
      <ProfessionHeader />
      <Box py={10}>
        <CustomContainer>
          <Box pt={4} display={"flex"} flexDirection={"column"}>
            <Typography variant="h4" fontWeight={600} width={"60%"} >
              Specialized design and creative experts you can count on
            </Typography>
          </Box>
        </CustomContainer>
      </Box>
    </Box> 
  );
}
