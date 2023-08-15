import { Box, Skeleton } from "@mui/material";

export default function JobShimmer() {
  return (
    <Box
      height={320}
      width={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"start"}
      alignItems={"start"}
    >
      <Box
        width={"100%"}
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"start"}
        alignItems={"center"}
      >
        <Skeleton variant="circular" height={64} animation="wave" width={64} />
        <Box width={"100%"}>
          <Skeleton sx={{ mx: 2 }} height={18} animation="wave" width={"75%"} />
          <Skeleton sx={{ mx: 2 }} height={18} animation="wave" width={"50%"} />
        </Box>
      </Box>
      <Box width={"100%"} py={1} >
        <Skeleton animation="wave" variant="rectangular" height={144} width={"100%"} />

        <Box
          width={"100%"}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"start"}
          alignItems={"center"}
          py={2}
        >
          <Skeleton
            variant="rounded"
            animation="wave"
            height={48}
            sx={{ mr: 2 }}
            width={"30%"}
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            height={48}
            width={"30%"}
          />
        </Box>
      </Box>
    </Box>
  );
}
