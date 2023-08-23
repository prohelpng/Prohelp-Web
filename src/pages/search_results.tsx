import {
  Box,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import image from "../assets/images/search_vector.png";
import MyAutoComplete from "../components/inputs/auto_complete";
import { useLocation } from "react-router-dom";
import notFoundImage from "../assets/images/empty.png";
import JobCard from "../components/jobs/jobs_card";
import ProCard from "../components/professional/pro_card";

export default function SearchResultsPage(): React.JSX.Element {
  const location = useLocation();
  const { data } = location.state;
  const [deviceType, setDeviceType] = React.useState("mobile");
  const [searchTerm, setSearchTerm] = React.useState<string>(
    data?.searchTerm ?? ""
  );
  const [searchLocation, setSearchLocation] = React.useState<string>(
    data?.searchLocation ?? ""
  );

  //   console.log("DATAS >> ", data);

  const theme = useTheme();
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

    if (data) {
      setSearchLocation(data?.searchLocation);
      setSearchTerm(data?.searchTerm);
    }

    if (location) {
      const searchKey = location.pathname.split("results/")[1];
      setSearchTerm(searchKey);
    }
  }, [data, location, mobile, tablet]);

  const pluralizer = (num: number) => {
    return num > 1 ? "s" : "";
  };

  return (
    <Box display={"flex"} flexDirection={"column"} justifyContent={"start"}>
      <Box
        bgcolor={theme.palette.primary.light}
        width={"100%"}
        display={"flex"}
        paddingY={deviceType === "pc" ? 1 : 6}
        flexDirection={"column"}
        justifyContent={"start"}
      >
        <Container sx={{ height: "100%" }}>
          <Grid
            container
            spacing={2}
            display="flex"
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            height={"100%"}
          >
            <Grid item xs={12} sm={12} md={6}>
              <Typography
                gutterBottom
                fontSize={
                  deviceType === "pc"
                    ? "3.5rem"
                    : deviceType === "tablet"
                    ? "3.125rem"
                    : "2.25rem"
                }
                component="h1"
                color="black"
                textAlign={"left"}
              >
                Search Results
              </Typography>
              <MyAutoComplete />
            </Grid>
            {deviceType === "pc" && (
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"end"}
              >
                <img src={image} alt="" width={"75%"} />
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>

      <Box
        bgcolor={"white"}
        py={10}
        color={"black"}
        width={"100%"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"start"}
      >
        <Container sx={{ height: "100%" }}>
          {deviceType !== "mobile" ? (
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography variant="h6" fontWeight={600}>
                {`Showing search results for ${searchTerm} ${
                  searchLocation ? "in " + searchLocation : ""
                }`}
              </Typography>

              <Typography variant="h6">
                {` ${data?.length} item${pluralizer(data?.length)} found`}
              </Typography>
            </Box>
          ) : (
            <Typography variant="h6">
              {` ${data?.length} item${pluralizer(
                data?.length
              )} found for ${searchTerm} ${
                searchLocation ? "in " + searchLocation : ""
              }`}
            </Typography>
          )}
          {data?.length < 1 ? (
            <Box
              minHeight={200}
              width={"100%"}
              padding={5}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <img src={notFoundImage} alt="" />
              <Typography>No record found</Typography>
            </Box>
          ) : (
            <Box py={2}>
              <Grid container spacing={2}>
                {data?.map((item: any, index: number) => (
                  <Grid key={index} item xs={12} sm={6} md={6} lg={4} xl={3}>
                    {item?.hasOwnProperty("jobTitle") ? (
                      <JobCard item={item} isLoading={false} />
                    ) : (
                      <ProCard data={item} height={360} />
                    )}
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
}
