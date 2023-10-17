import * as React from "react";
import {
  Badge,
  Box,
  Button,
  Card,
  Grid,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ProfessionHeader from "../../layouts/headers/profession";
import CustomContainer from "../../components/container";
import { useLocation } from "react-router-dom";
// import theme from "../../assets/theme/Theme";
import { ArrowDropDown, FilterAlt } from "@mui/icons-material";
import CustomizedDialog from "../../components/dialog";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/apphook";
import { setProsByCategory } from "../../redux/reducers/users";
import ProShimmer from "../../components/skeleton/pro_card_loader";
import APIService from "../../service";
import ProCard from "../../components/professional/pro_card";
import emptyImage from "../../assets/images/empty.png";
import FullScreenDialog from "../../components/dialog/fullscreen_dialog";
import AllFilter from "./all_filter";
import LocationContent from "./location_body";
import SidebarFilter from "./sidebar_filter";
import CardButton from "../../components/button/card_button";

export default function Category(): React.JSX.Element {
  let location = useLocation();
  const { data } = location?.state;
  const [loading, setLoading] = React.useState<boolean>(true);
  const [dataResult, setDataResult] = React.useState([]);
  const [deviceType, setDeviceType] = React.useState("mobile");

  const dispatch = useAppDispatch();
  const prodsByCategory = useAppSelector((state) => state.users.prosByCategory);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [openFullDialog, setOpenFullDialog] = React.useState<boolean>(false);

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only("xs"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));

  React.useEffect(() => {
    if (data) {
      // Make API trip here
      APIService.fetcher(`/freelancers/${data?.name}`)
        .then((res) => {
          console.log("REPONSE --> ", res);
          setLoading(false);
          dispatch(setProsByCategory(res));
          setDataResult(res?.docs);
        })
        .catch((err) => {
          console.log("ERROR --> ", err);
        });
    }
  }, [location, data]);

  React.useEffect(() => {
    if (mobile) {
      setDeviceType("mobile");
    } else if (tablet) {
      setDeviceType("tablet");
    } else {
      setDeviceType("pc");
    }
  }, [mobile, tablet]);

  const sidebarRef = React.useRef<any>();
  const sidebarContentRef = React.useRef<any>();

  const [isFixed, setIsFixed] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const sidebar: any = document.querySelector(".sidebar");
      const sidebarContent: any = document.querySelector(".content-wrapper");

      if (scrollTop > 256) {
        // console.log("GRETER!!! ", scrollTop);
        // console.log("INNER !!! ", viewportHeight);
        setIsFixed(true);
      } else if (scrollTop < 256 || scrollTop > 600) {
        setIsFixed(false);
      }
      // if (
      //   sidebar !== null &&
      //   sidebar !== undefined &&
      //   sidebarContent !== null &&
      //   sidebarContent !== undefined
      // ) {
      //   const sidebarTop =
      //     sidebar.getBoundingClientRect()?.top + window.pageYOffset;

      //   const contentHeight = sidebarContent.getBoundingClientRect().height;

      //   if (scrollTop >= 200) {
      //     sidebar.style.transform = `translateY(-${
      //       contentHeight - viewportHeight + sidebarTop
      //     }px)`;
      //     setIsFixed(true);

      //   } else {
      //     sidebar.style.transform = "";
      //     setIsFixed(false);
      //   }
      // }
    };

    window.addEventListener("scroll", handleScroll);

    // return () => {
    //   window.removeEventListener("scroll", handleScroll);
    // };
  });

  // React.useEffect(() => {
  //   console.log(window.scrollY);
  //   window.onscroll = () => {
  //     let scrollTop = window.scrollY;
  //     let viewportHeight = window.innerHeight;
  //     let sidebarTop =  sidebarRef?.current.getBoundingClientRect().top + window.pageYOffset;
  //     let contentHeight = sidebarContentRef?.current?.getBoundingClientRect().height;

  //     if (scrollTop >= contentHeight - viewportHeight + sidebarTop) {
  //       sidebarContentRef.current.style.transform = `translateY(-${
  //         contentHeight - viewportHeight + sidebarTop
  //       }px)`;
  //       sidebarContentRef?.current?.style.position = "fixed";
  //     } else {
  //       sidebarContentRef.current?.style.transform = "";
  //       sidebarContentRef.current?.style.position = "";
  //     }
  //   };
  // });

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <CustomizedDialog
        open={openDialog}
        setOpen={setOpenDialog}
        title="Select location of interest"
        body={<LocationContent setOpen={setOpenDialog} />}
      />
      <FullScreenDialog
        open={openFullDialog}
        setOpen={setOpenFullDialog}
        title="All Filters"
        body={<AllFilter data={data} />}
      />
      <br/>
      <ProfessionHeader data={data} deviceType={deviceType} />

      <Box py={5}>
        <CustomContainer>
          <Grid container spacing={2} position={"relative"}>
            {deviceType === "mobile" || deviceType === "tablet" ? (
              <Grid
                item
                xs={12}
                sm={12}
                position={"sticky"}
                top={0}
                bgcolor={"white"}
                zIndex={100}
              >
                <Toolbar />
                {/* <Typography>{deviceType}</Typography> */}
                <Card
                  elevation={1}
                  sx={{
                    position: "relative",
                    borderRadius: 4,
                    border: "none",
                    p: 1,
                    boxShadow:
                      "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                  }}
                >
                  <Box
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"space-evenly"}
                    alignItems={"center"}
                    bgcolor={"white"}
                    overflow={"visible"}
                    sx={{
                      overflow: "scroll",
                    }}
                  >
                    <Button
                      variant="text"
                      sx={{
                        textTransform: "capitalize",
                        textAlign: "left",
                        my: 1,
                        fontSize: 13,
                        border: "1px solid",
                      }}
                      onClick={() => setOpenFullDialog(true)}
                      startIcon={<FilterAlt fontSize="small" />}
                    >
                      <Box
                        display={"flex"}
                        flexDirection={"row"}
                        justifyContent={"start"}
                      >
                        All Filters
                        <Badge color={"primary"} badgeContent={2} />
                      </Box>
                    </Button>

                    <Button
                      variant="text"
                      sx={{
                        textTransform: "capitalize",
                        textAlign: "left",
                        my: 1,
                        fontSize: 13,
                        border: "1px solid",
                      }}
                      onClick={() => setOpenDialog(true)}
                    >
                      <Box
                        display={"flex"}
                        flexDirection={"row"}
                        justifyContent={"start"}
                        alignItems={"center"}
                      >
                        Location
                        <ArrowDropDown fontSize="small" />
                      </Box>
                    </Button>

                    <Button
                      variant="text"
                      sx={{
                        textTransform: "capitalize",
                        textAlign: "left",
                        my: 1,
                        fontSize: 13,
                        border: "1px solid",
                      }}
                      onClick={() => setOpenDialog(true)}
                    >
                      <Box
                        display={"flex"}
                        flexDirection={"row"}
                        justifyContent={"start"}
                        alignItems={"center"}
                      >
                        Skills
                        <ArrowDropDown fontSize="small" />
                      </Box>
                    </Button>

                    {deviceType === "tablet" && (
                      <Button
                        variant="text"
                        sx={{
                          textTransform: "capitalize",
                          textAlign: "left",
                          my: 1,
                          fontSize: 13,
                          border: "1px solid",
                        }}
                        onClick={() => setOpenDialog(true)}
                      >
                        <Box
                          display={"flex"}
                          flexDirection={"row"}
                          justifyContent={"start"}
                          alignItems={"center"}
                        >
                          Age
                          <ArrowDropDown fontSize="small" />
                        </Box>
                      </Button>
                    )}

                    {deviceType === "tablet" && (
                      <Button
                        variant="text"
                        sx={{
                          textTransform: "capitalize",
                          textAlign: "left",
                          my: 1,
                          fontSize: 13,
                          border: "1px solid",
                        }}
                        onClick={() => setOpenDialog(true)}
                      >
                        <Box
                          display={"flex"}
                          flexDirection={"row"}
                          justifyContent={"start"}
                          alignItems={"center"}
                        >
                          Marital Status
                          <ArrowDropDown fontSize="small" />
                        </Box>
                      </Button>
                    )}
                  </Box>
                </Card>
              </Grid>
            ) : (
              <Grid
                className={`sidebar${isFixed ? "fixed" : ""}`}
                item
                xs={12}
                sm={5}
                md={3}
                // position={isFixed ? "fixed" : "unset"}
                // top={isFixed ? 86 : 100}
                component={Box}
                ref={sidebarRef}
              >
                <Box
                  width={"100%"}
                  className="content-wrapper"
                  ref={sidebarContentRef}
                >
                  <SidebarFilter
                    data={data}
                    setDataResult={setDataResult}
                    setOpen={setOpenDialog}
                  />
                </Box>
              </Grid>
            )}

            <Grid item xs={12} sm={12} md={9}>
              {loading ? (
                <Grid container spacing={2}>
                  {[1, 2, 3, 4, 5, 6].map((item, index: number) => (
                    <Grid key={index} item xs={12} sm={6} md={4}>
                      <ProShimmer />
                    </Grid>
                  ))}
                </Grid>
              ) : dataResult?.length < 1 ? (
                <Box
                  p={2}
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  height={"100%"}
                >
                  <img src={emptyImage} alt="" />
                  <Typography p={2} gutterBottom>
                    No record found
                  </Typography>
                </Box>
              ) : (
                <Grid container spacing={2}>
                  {dataResult?.map((item: any, index: number) => (
                    <Grid key={index} item xs={12} sm={6} md={6} lg={4}>
                      <ProCard data={item} height={400} />
                    </Grid>
                  ))}
                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    <Box>
                      <CardButton height={400} />
                    </Box>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </CustomContainer>
      </Box>
    </Box>
  );
}
