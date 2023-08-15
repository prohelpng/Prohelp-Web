import {
  Circle,
  LocationCity,
  Work,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Container,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { formatDistance } from "date-fns";
import { useLocation, useNavigate } from "react-router-dom";
import RoundedButton from "../../components/button/round_button";
import React from "react";
import { useAppSelector } from "../../utils/hooks/apphook";

interface DateOptions {
  includeSeconds: boolean;
  addSuffix: boolean;
}

export default function JobInfo() {
  const location = useLocation();
  const { data } = location?.state;

  const [deviceType, setDeviceType] = React.useState("mobile");

  const theme = useTheme();
  const navigate = useNavigate()
  const mobile = useMediaQuery(theme.breakpoints.only("xs"));
  const tablet = useMediaQuery(theme.breakpoints.only("sm"));

  const profile = useAppSelector((state) => state.auth.profile);
  const isAuth = useAppSelector((state) => state.auth.isAuth)

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
    <Box display={"flex"} flexDirection={"column"}>
      {deviceType === "pc" ? <Toolbar /> : <br />}
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={8}>
            <Typography
              py={2}
              gutterBottom
              variant={deviceType === "pc" ? "h4" : "h5"}
              textTransform={"capitalize"}
            >
              {data?.jobTitle}
            </Typography>
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"start"}
              alignItems={"center"}
              textTransform={"capitalize"}
            >
              <Typography pr={1} fontWeight={500}>
                {data?.company}
              </Typography>
              <Circle fontSize="small" sx={{ width: 6, height: 6 }} />
              <Typography
                color={"green"}
                fontWeight={500}
                px={1}
                textTransform={"capitalize"}
              >
                {` ${formatDistance(
                  Date.parse(`${data?.createdAt}`),
                  new Date(),
                  options
                )}`}
              </Typography>
              {deviceType === "pc" && (
                <>
                  <Circle fontSize="small" sx={{ width: 6, height: 6 }} />
                  <Typography px={1} fontWeight={400}>
                    {`${data?.applicants?.length} applicants`}
                  </Typography>
                </>
              )}
            </Box>
            {deviceType !== "pc" && (
              <Typography fontWeight={400}>
                {`${data?.applicants?.length} Applicants`}
              </Typography>
            )}
            <Box
              pt={2}
              pb={1}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"start"}
              alignItems={"center"}
              textTransform={"capitalize"}
            >
              <Work />
              <Typography px={2} fontWeight={400}>
                {`${data?.jobType} (${data?.workplaceType})`}
              </Typography>
            </Box>
            <Box
              pb={1}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"start"}
              alignItems={"center"}
              textTransform={"capitalize"}
            >
              <LocationCity />
              <Typography px={2} fontWeight={400}>
                {`${data?.jobLocation?.city},  ${data?.jobLocation?.state}`}
              </Typography>
            </Box>

            <Box
              pb={2}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"start"}
              alignItems={"start"}
              textTransform={"capitalize"}
            >
              <Typography pr={1} fontWeight={600}>
                {`Minimum qualification: `}
              </Typography>
              <Typography flex={1}>
                {`${data?.minimumQualification}`}
              </Typography>
            </Box>

            <Box
              pb={2}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"start"}
              alignItems={"start"}
            >
              <Typography pr={1} textTransform={"capitalize"} fontWeight={600}>
                {`About this job: `}
              </Typography>
              <Typography flex={1} textTransform={"revert"}>
                {`${data?.description}`}
              </Typography>
            </Box>

            <Box
              pb={2}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"start"}
              alignItems={"start"}
            >
              <Typography pr={1} textTransform={"capitalize"} fontWeight={600}>
                {`Requirements: `}
              </Typography>
              <ul>
                {data?.requirements?.map((item: any, index: number) => (
                  <li key={index}> {item} </li>
                ))}
              </ul>
            </Box>

            <Box
              pb={4}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"start"}
              alignItems={"center"}
            >
              <IconButton>
                <Avatar
                  alt={data?.recruiter?.name}
                  src={data?.recruiter?.photo}
                />
              </IconButton>
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"start"}
                alignItems={"start"}
                textTransform={"capitalize"}
              >
                <Typography fontWeight={600} variant="body1">
                  {data?.recruiter?.name}
                </Typography>
                <Typography fontWeight={600} variant="body2">
                  {`Posted on ${new Date(
                    Date.parse("" + data?.createdAt)
                  ).toLocaleDateString()}`}
                </Typography>
              </Box>
            </Box>

            <Box
              pb={2}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"start"}
              alignItems={"start"}
            >
              <RoundedButton
                sx={{
                  height: 48,
                  width: 128,
                  color: "white",
                  backgroundColor: theme.palette.primary.main,
                  display:
                    profile?.accountType === "recruiter" ? "none" : "block",
                }}
                onClick={() => {
                   if (!isAuth) {
                    navigate("/login")
                   }
                }}
              >
                Apply now
              </RoundedButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Toolbar />
    </Box>
  );
}
