import { Box, Card, Typography } from "@mui/material";

interface Props {
  about: any;
}

export default function AboutSection(props: Props) {
  let { about } = props;
  return (
    <Card>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"start"}
        alignItems={"start"}
        p={2}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h6" fontWeight={500} gutterBottom>
            About
          </Typography>
        </Box>
        <Typography variant="body2" gutterBottom>
          {about}
        </Typography>
      </Box>
    </Card>
  );
}
