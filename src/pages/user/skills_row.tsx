import { Box, Typography } from "@mui/material";
import theme from "../../assets/theme/Theme";

interface Props {
  skills: any;
}

export default function SkillsRow(props: Props) {
  let { skills } = props;
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"start"}
      alignItems={"center"}
      pb={1}
    >
      {skills &&
        skills?.map((item: any, key: number) => (
          <Typography fontSize={"0.86rem"} textTransform={'capitalize'} borderRadius={3} px={1} py={0.5} mx={1} bgcolor={theme.palette.secondary.light} key={key}>
            {item?.name}
          </Typography>
        ))}
      {/* <Grid container spacing={1}>
        {skills && skills?.map((item: any, key: number) => (
            <Grid key={key} item xs={6} >
                {item}
            </Grid>
        ))}
      </Grid> */}
    </Box>
  );
}
