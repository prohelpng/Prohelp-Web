import * as React from "react";
import { Favorite, FavoriteOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  Chip,
  IconButton,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface Props {
  data: any;
}

interface CustomButtonProps {
  children: React.ReactNode;
}

const HoverCard = styled(Card)<CustomButtonProps>(({ theme }) => ({
  background: "white",
  borderRadius: "4px",
  cursor: "pointer",
  "&:hover": {
    background: "#0066f51d",
    color: "black",
  },
}));

export default function ProCard(props: Props) {
  let { data } = props;
  const theme = useTheme();
  const [isLiked, setLiked] = React.useState(false);

  const [deviceType, setDeviceType] = React.useState("mobile");

  const mobile = useMediaQuery(theme.breakpoints.only("xs"));
  const tablet = useMediaQuery(theme.breakpoints.only("sm"));

  React.useEffect(() => {
    if (mobile) {
      setDeviceType("mobile");
    } else if (tablet) {
      setDeviceType("tablet");
    } else {
      setDeviceType("pc");
    }
  }, [mobile, tablet]);

  return (
    <HoverCard sx={{ my: 2 }}>
      <Box
        p={2}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"start"}
        alignItems={"stretch"}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"start"}
        >
          <Box
            width={"100%"}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"start"}
            alignItems={"start"}
          >
            <Avatar
              alt="Remy Sharp"
              sx={{
                width: deviceType === "pc" ? 70 : 48,
                height: deviceType === "pc" ? 70 : 48,
              }}
              src={data?.bio?.image}
            />
            <Box
              mr={deviceType === "pc" ? 4 : deviceType === "tablet" ? 2 : 1}
            />
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"start"}
              alignItems={"start"}
            >
              <Typography
                lineHeight={1.12}
                variant="body1"
                fontWeight={600}
                textTransform={"capitalize"}
                color={theme.palette.primary.main}
              >
                {`${data?.bio?.firstname} ${data?.bio?.middlename} ${data?.bio?.lastname}`}
              </Typography>
              <Typography
                variant="body2"
                fontWeight={600}
                textTransform={"capitalize"}
              >
                {`${data?.profession}`}
              </Typography>
              <Typography variant="body2" textTransform={"capitalize"}>
                {`${data?.address?.city}, ${data?.address?.country}`}
              </Typography>
            </Box>
          </Box>
          <Box>
            <IconButton onClick={() => setLiked(!isLiked)}>
              {isLiked ? (
                <Favorite sx={{ color: "red" }} />
              ) : (
                <FavoriteOutlined />
              )}
            </IconButton>
          </Box>
        </Box>
        <Box p={deviceType === "pc" ? 2 : deviceType === "tablet" ? 1 : 0.5} />
        <Typography gutterBottom variant="body2" >
          {`${data?.bio?.about}`?.substring(0, deviceType === "pc" ? 200 : deviceType === "tablet" ? 150 : 100)}
        </Typography>
        <Box display={"flex"} flexDirection={"row"}>
          {data?.skills?.map((val: any) => (
            <Chip
              sx={{ mr: 1, textTransform: "capitalize" }}
              label={val?.name}
            />
          ))}
        </Box>
      </Box>
    </HoverCard>
  );
}
