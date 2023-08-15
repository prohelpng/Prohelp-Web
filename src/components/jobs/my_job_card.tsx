import {
  Avatar,
  Box,
  Card,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../utils/hooks/apphook";
import formatDistance from "date-fns/formatDistance";

interface Props {
  data: any;
}
interface DateOptions {
  includeSeconds: boolean;
  addSuffix: boolean;
}

export default function MyPostedJobCard(props: Props) {
  const { data } = props;
  const navigate = useNavigate();
  const [deviceType, setDeviceType] = React.useState("mobile");

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only("xs"));
  const tablet = useMediaQuery(theme.breakpoints.only("sm"));

  const profile = useAppSelector((state) => state.auth.profile);

  React.useEffect(() => {
    if (mobile) {
      setDeviceType("mobile");
    } else if (tablet) {
      setDeviceType("tablet");
    } else {
      setDeviceType("pc");
    }
  }, [mobile, tablet]);

  let options: DateOptions = {
    addSuffix: true,
    includeSeconds: true,
  };

  return (
    <Card>
      <Box
        p={2}
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"start"}
        alignItems={"start"}
      >
        <Box>
          <IconButton onClick={() => navigate("")}>
            <Avatar
              alt="Remy Sharp"
              sx={{
                width: deviceType === "pc" ? 64 : 36,
                height: deviceType === "pc" ? 64 : 36,
              }}
              src={data?.recruiter?.photo}
            />
          </IconButton>
        </Box>

        <Box
          p={0.5}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"start"}
          alignItems={"start"}
        >
          <Typography
            fontWeight={500}
            textTransform={"capitalize"}
            fontSize="1.2rem"
            gutterBottom
            sx={{ textDecoration: "underline" }}
          >
            {data?.jobTitle}
          </Typography>

          <Typography
            textTransform={"capitalize"}
            fontSize="1.12rem"
            gutterBottom
          >
            {`${data?.company}  (${data?.workplaceType})`}
          </Typography>

          <Typography
            textTransform={"capitalize"}
            fontSize="1.12rem"
            gutterBottom
          >
            {`${data?.jobLocation?.city}, ${data?.jobLocation?.state}, ${data?.jobLocation?.country}`}
          </Typography>
          <Typography
            gutterBottom
            fontSize={"0.75rem"}
            textTransform={"capitalize"}
          >
            {`Created  ${formatDistance(
              Date.parse(`${data?.createdAt}`),
              new Date(),
              options
            )}`}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
