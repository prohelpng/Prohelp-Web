import {
  Avatar,
  Box,
  Button,
  IconButton,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import RoundedButton from "../button/round_button";

import formatDistance from "date-fns/formatDistance";
import { LocationOnOutlined } from "@mui/icons-material";
import { useAppSelector } from "../../utils/hooks/apphook";

interface Props {
  item: any;
  isLoading: boolean;
}

interface DateOptions {
  includeSeconds: boolean;
  addSuffix: boolean;
}

export default function JobCard(props: Props) {
  let { item, isLoading } = props;
  const navigate = useNavigate();
  const [deviceType, setDeviceType] = React.useState("mobile");

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only("xs"));
  const tablet = useMediaQuery(theme.breakpoints.only("sm"));

  const profile = useAppSelector((state) => state.auth.profile);
  const isAuth = useAppSelector((state) => state.auth.isAuth);

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

  // let timeAgo: string = formatDistance(subDays(Date.parse({`${item?.createdAt}`})), new Date(), { addSuffix: true })}

  return (
    <Box
      borderRadius={6}
      border={"0.1px solid"}
      padding={deviceType === "pc" ? 3 : 1.5}
      height={386}
      width={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"start"}
    >
      {
        isLoading ? <Skeleton animation="wave" height={10} width={"75%"} /> : <Typography
        fontWeight={500}
        textTransform={"capitalize"}
        fontSize="1.2rem"
        gutterBottom
      >
        {`${item?.jobTitle} (${item?.workplaceType ?? "Remote"})`}
      </Typography>
      }
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"start"}
        alignItems={"center"}
        py={0.5}
      >
        <IconButton onClick={() => navigate("")}>
          <Avatar
            alt="Remy Sharp"
            sx={{
              width: deviceType === "pc" ? 50 : 36,
              height: deviceType === "pc" ? 50 : 36,
            }}
            src={item?.recruiter?.photo}
          />
        </IconButton>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"start"}
          alignItems={"start"}
        >
          <Typography fontSize={"1rem"} textTransform={"capitalize"}>
            {item?.recruiter?.name}
          </Typography>

          <Typography
            gutterBottom
            fontSize={"0.75rem"}
            textTransform={"capitalize"}
          >
            {`Posted  ${formatDistance(
              Date.parse(`${item?.createdAt}`),
              new Date(),
              options
            )}`}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography gutterBottom textTransform={"initial"}>
          {`${item?.description}`?.substring(0, 100) + "..."}
        </Typography>
      </Box>
      <Box
        width={"100%"}
        pb={1}
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"start"}
          alignItems={"center"}
        >
          <LocationOnOutlined />
          <Typography
            textTransform={
              item?.jobLocation?.state?.startsWith("fct")
                ? "uppercase"
                : "capitalize"
            }
          >
            {`${item?.jobLocation?.state}`}
          </Typography>
        </Box>
        <Box>
          <Typography>{`${item?.applicants?.length} ${
            item?.applicants?.length > 1 ? "applicants" : "applicant"
          } `}</Typography>
        </Box>
      </Box>
      <Box
        flexGrow={1}
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"start"}
        alignItems={"center"}
      >
        <Button
          variant="outlined"
          sx={{
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
            padding: "12px",
            width: 120,
            height: 40,
            borderRadius: "32px",
            textTransform: "capitalize",
            "&:hover": {
              background: "#131022",
              color: "white",
              border: "none",
            },
          }}
          onClick={() =>
            navigate("/jobs/" + item?.id, { state: { data: item } })
          }
        >
          See more
        </Button>
        {profile?.accountType !== "recruiter" && (
          <RoundedButton
            sx={{
              bgcolor: theme.palette.primary.main,
              color: "white",
              width: 120,
              height: 40,
              ml: 2,
            }}
            onClick={() => {
              if (!isAuth) {
               navigate("/login")
              }
           }}
          >
            Apply
          </RoundedButton>
        )}
      </Box>
    </Box>
  );
}
