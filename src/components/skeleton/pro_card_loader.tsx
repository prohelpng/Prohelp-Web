import { Favorite } from "@mui/icons-material";
import { Box, Skeleton } from "@mui/material";

export default function ProShimmer() {
  return (
    <Box
      p={2}
      height={400}
      width={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"start"}
      alignItems={"start"}
      border={"0.5px solid grey"}
      borderRadius={6}
    >
      <Box
        width={"100%"}
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        position={"relative"}
      >
        <Skeleton
          variant="circular"
          height={128}
          animation="wave"
          width={128}
        />
        <Box position={"absolute"} right={2} top={2}>
          <Favorite fontSize="medium" color="secondary" />
        </Box>
      </Box>
      <Box
        width={"100%"}
        py={1}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Skeleton animation="wave" variant="text" height={32} width={"70%"} />
        <Skeleton animation="wave" variant="text" height={21} width={"20%"} />
        <Skeleton animation="wave" variant="text" height={21} width={"40%"} />
        <Skeleton animation="wave" variant="text" height={21} width={"36%"} />
        
        <Box
          width={"100%"}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          py={2}
        >
          <Skeleton
            variant="rounded"
            animation="wave"
            height={30}
            sx={{borderRadius: 4}}
            width={"20%"}
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            height={30}
            sx={{ mx: 1, borderRadius: 4 }}
            width={"20%"}
          />
           <Skeleton
            variant="rounded"
            animation="wave"
            height={30}
            sx={{borderRadius: 4}}
            width={"20%"}
          />
        </Box>

        <Box
          width={"100%"}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          pt={4}
        >
          <Skeleton
            variant="rounded"
            animation="wave"
            height={36}
            sx={{borderRadius: 6}}
            width={"36%"}
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            height={36}
            sx={{ ml: 2, borderRadius: 6 }}
            width={"36%"}
          />
        </Box>
      </Box>
    </Box>
  );
}
