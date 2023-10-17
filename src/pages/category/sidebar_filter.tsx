import { ArrowForwardIos } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import RoundedButton from "../../components/button/round_button";
import { setLoading } from "../../redux/reducers/loader";
import {
  setFilterAge,
  setFilterLocation,
  setFilterMaritalStatus,
  setFilterSkills,
  setProsByCategory,
} from "../../redux/reducers/users";
import APIService from "../../service";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/apphook";

interface SidebarFilterProps {
  setOpen: any;
  data: any;
  setDataResult: any;
}

export default function SidebarFilter({
  data,
  setOpen,
  setDataResult,
}: SidebarFilterProps) {
  const theme = useTheme();
  const [selectedSkills, setSelectedSkills] = React.useState<string[]>(
    () => []
  );

  const filterLocation = useAppSelector((state) => state.users.filterLocation);
  const filterSkills = useAppSelector((state) => state.users.filterSkills);
  const filterAge = useAppSelector((state) => state.users.filterAge);
  const filterMaritalStatus = useAppSelector(
    (state) => state.users.filterMaritalStatus
  );

  // const [dataResult, setDataResult] = React.useState([]);
  // const [deviceType, setDeviceType] = React.useState("mobile");

  const dispatch = useAppDispatch();

  const handleSelection = (
    event: React.MouseEvent<HTMLElement>,
    newSkills: string[]
  ) => {
    setSelectedSkills(newSkills);
    // setIndexer(newSkills);
    console.log("SKILL ==>> ", newSkills);
    dispatch(setFilterSkills(newSkills));
  };

  const filter = () => {
    const pal = {
      location: filterLocation,
      age: filterAge,
      marital: filterMaritalStatus,
      skills: filterSkills,
    };
    console.log("CURRENT STATE DATA ==>> ", pal);

    if (filterLocation !== "All of Nigeria") {
      if (
        filterLocation &&
        filterSkills.length < 1 &&
        !filterAge &&
        !filterMaritalStatus
      ) {
        console.log("A");
        APIService.fetcher(
          `/freelancers/${data?.name}?location=${filterLocation}`
        )
          .then((res) => {
            console.log("RESPONSE LOCATION --> ", res);
            setLoading(false);
            dispatch(setProsByCategory(res));
            setDataResult(res?.docs);
          })
          .catch((err) => {
            console.log("ERROR --> ", err);
          });
      } else if (
        filterLocation &&
        filterSkills.length > 0 &&
        !filterAge &&
        !filterMaritalStatus
      ) {
        console.log("B");
        APIService.fetcher(
          `/freelancers/${data?.name}?location=${filterLocation}&skills=${filterSkills}`
        )
          .then((res) => {
            console.log("RESPONSE LOCATION --> ", res);
            setLoading(false);
            dispatch(setProsByCategory(res));
            setDataResult(res?.docs);
          })
          .catch((err) => {
            console.log("ERROR --> ", err);
          });
      } else if (
        filterLocation &&
        filterSkills.length > 0 &&
        filterAge &&
        !filterMaritalStatus
      ) {
        console.log("C");

        APIService.fetcher(
          `/freelancers/${data?.name}?location=${filterLocation}&skills=${filterSkills}&age=${filterAge}`
        )
          .then((res) => {
            console.log("RESPONSE LOCATION --> ", res);
            setLoading(false);
            dispatch(setProsByCategory(res));
            setDataResult(res?.docs);
          })
          .catch((err) => {
            console.log("ERROR --> ", err);
          });
      } else if (
        filterLocation &&
        filterSkills.length > 0 &&
        filterAge &&
        filterMaritalStatus
      ) {
        console.log("D");
        APIService.fetcher(
          `/freelancers/${data?.name}?location=${filterLocation}&skills=${filterSkills}&age=${filterAge}&maritalStatus=${filterMaritalStatus}`
        )
          .then((res) => {
            console.log("RESPONSE LOCATION --> ", res);
            setLoading(false);
            dispatch(setProsByCategory(res));
            setDataResult(res?.docs);
          })
          .catch((err) => {
            console.log("ERROR --> ", err);
          });
      } else if (
        filterLocation &&
        filterSkills.length < 1 &&
        filterAge &&
        filterMaritalStatus
      ) {
        console.log("E");
        APIService.fetcher(
          `/freelancers/${data?.name}?location=${filterLocation}&age=${filterAge}&maritalStatus=${filterMaritalStatus}`
        )
          .then((res) => {
            console.log("RESPONSE LOCATION --> ", res);
            setLoading(false);
            dispatch(setProsByCategory(res));
            setDataResult(res?.docs);
          })
          .catch((err) => {
            console.log("ERROR --> ", err);
          });
      } else if (
        filterLocation &&
        filterSkills.length < 1 &&
        !filterAge &&
        filterMaritalStatus
      ) {
        console.log("F");
        APIService.fetcher(
          `/freelancers/${data?.name}?location=${filterLocation}&maritalStatus=${filterMaritalStatus}`
        )
          .then((res) => {
            console.log("RESPONSE LOCATION --> ", res);
            setLoading(false);
            dispatch(setProsByCategory(res));
            setDataResult(res?.docs);
          })
          .catch((err) => {
            console.log("ERROR --> ", err);
          });
      } else if (
        filterLocation &&
        filterSkills.length < 1 &&
        filterAge &&
        !filterMaritalStatus
      ) {
        console.log("G");
        APIService.fetcher(
          `/freelancers/${data?.name}?location=${filterLocation}&age=${filterAge}`
        )
          .then((res) => {
            console.log("RESPONSE LOCATION --> ", res);
            setLoading(false);
            dispatch(setProsByCategory(res));
            setDataResult(res?.docs);
          })
          .catch((err) => {
            console.log("ERROR --> ", err);
          });
      } else if (
        filterLocation &&
        filterSkills.length > 0 &&
        !filterAge &&
        filterMaritalStatus
      ) {
        console.log("H");
        APIService.fetcher(
          `/freelancers/${data?.name}?location=${filterLocation}&skills=${filterSkills}&maritalStatus=${filterMaritalStatus}`
        )
          .then((res) => {
            console.log("RESPONSE LOCATION --> ", res);
            setLoading(false);
            dispatch(setProsByCategory(res));
            setDataResult(res?.docs);
          })
          .catch((err) => {
            console.log("ERROR --> ", err);
          });
      }
    } else {
      console.log("THERE IS NO LOCATOIN");

      if (filterSkills.length > 0 && !filterAge && !filterMaritalStatus) {
        console.log(1);

        APIService.fetcher(`/freelancers/${data?.name}?skills=${filterSkills}`)
          .then((res) => {
            console.log("RESPONSE LOCATION --> ", res);
            setLoading(false);
            dispatch(setProsByCategory(res));
            setDataResult(res?.docs);
          })
          .catch((err) => {
            console.log("ERROR --> ", err);
          });
      } else if (filterSkills.length > 0 && filterAge && !filterMaritalStatus) {
        console.log(2);
        APIService.fetcher(
          `/freelancers/${data?.name}?skills=${filterSkills}&age=${filterAge}`
        )
          .then((res) => {
            console.log("RESPONSE LOCATION --> ", res);
            setLoading(false);
            dispatch(setProsByCategory(res));
            setDataResult(res?.docs);
          })
          .catch((err) => {
            console.log("ERROR --> ", err);
          });
      } else if (filterSkills.length > 0 && filterAge && filterMaritalStatus) {
        console.log(3);
        APIService.fetcher(
          `/freelancers/${data?.name}?skills=${filterSkills}&age=${filterAge}&maritalStatus=${filterMaritalStatus}`
        )
          .then((res) => {
            console.log("RESPONSE LOCATION --> ", res);
            setLoading(false);
            dispatch(setProsByCategory(res));
            setDataResult(res?.docs);
          })
          .catch((err) => {
            console.log("ERROR --> ", err);
          });
      } else if (filterSkills.length < 1 && filterAge && filterMaritalStatus) {
        console.log(4);
        APIService.fetcher(
          `/freelancers/${data?.name}?age=${filterAge}&maritalStatus=${filterMaritalStatus}`
        )
          .then((res) => {
            console.log("RESPONSE LOCATION --> ", res);
            setLoading(false);
            dispatch(setProsByCategory(res));
            setDataResult(res?.docs);
          })
          .catch((err) => {
            console.log("ERROR --> ", err);
          });
      } else if (filterSkills.length < 1 && !filterAge && filterMaritalStatus) {
        console.log(5);
        APIService.fetcher(
          `/freelancers/${data?.name}?maritalStatus=${filterMaritalStatus}`
        )
          .then((res) => {
            console.log("RESPONSE LOCATION --> ", res);
            setLoading(false);
            dispatch(setProsByCategory(res));
            setDataResult(res?.docs);
          })
          .catch((err) => {
            console.log("ERROR --> ", err);
          });
      } else if (filterSkills.length < 1 && filterAge && !filterMaritalStatus) {
        console.log(6);
        APIService.fetcher(`/freelancers/${data?.name}?age=${filterAge}`)
          .then((res) => {
            console.log("RESPONSE LOCATION --> ", res);
            setLoading(false);
            dispatch(setProsByCategory(res));
            setDataResult(res?.docs);
          })
          .catch((err) => {
            console.log("ERROR --> ", err);
          });
      } else if (filterSkills.length > 0 && !filterAge && filterMaritalStatus) {
        console.log(7);
        APIService.fetcher(`/freelancers/${data?.name}?age=${filterAge}`)
          .then((res) => {
            console.log("RESPONSE LOCATION --> ", res);
            setLoading(false);
            dispatch(setProsByCategory(res));
            setDataResult(res?.docs);
          })
          .catch((err) => {
            console.log("ERROR --> ", err);
          });
      } else if (
        filterSkills.length < 1 &&
        !filterAge &&
        !filterMaritalStatus
      ) {
        console.log(8);
        APIService.fetcher(`/freelancers/${data?.name}`)
          .then((res) => {
            console.log("RESPONSE LOCATION --> ", res);
            setLoading(false);
            dispatch(setProsByCategory(res));
            setDataResult(res?.docs);
          })
          .catch((err) => {
            console.log("ERROR --> ", err);
          });
      }
    }
  };

  const clearFilter = () => {
    setSelectedSkills([]);
    dispatch(setFilterLocation("All of Nigeria"));
    dispatch(setFilterAge(null));
    dispatch(setFilterSkills([]));
    dispatch(setFilterMaritalStatus(null));
  };

  return (
    <Box>
      <Card sx={{ position: "relative", borderRadius: 4 }}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"start"}
          alignItems={"start"}
        >
          <Box
            p={2}
            width={"100%"}
            bgcolor={theme.palette.primary.main}
            color={"white"}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="h6">Filter</Typography>
            {(!filterLocation.startsWith("All ") ||
              filterAge ||
              filterMaritalStatus ||
              filterSkills.length > 0) && (
              <RoundedButton
                variant="contained"
                sx={{
                  bgcolor: "white",
                  color: theme.palette.primary.main,
                  height: 32,
                }}
                onClick={clearFilter}
              >
                Reset
              </RoundedButton>
            )}
          </Box>

          <Button
            fullWidth
            variant="text"
            sx={{
              textTransform: "capitalize",
              textAlign: "left",
              my: 1,
            }}
            onClick={() => setOpen(true)}
          >
            <Box
              px={1}
              width={"100%"}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"start"}
                alignItems={"start"}
              >
                <Typography fontWeight={700}>Location</Typography>
                <Typography fontSize={12} color={"black"}>
                  {filterLocation}
                </Typography>
              </Box>
              <ArrowForwardIos fontSize="small" color="secondary" />
            </Box>
          </Button>
        </Box>
      </Card>

      {/* Skills card */}
      <Card sx={{ position: "relative", borderRadius: 4, mt: 1, p: 1 }}>
        <Box
          p={1}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"start"}
          alignItems={"start"}
        >
          <Typography color={theme.palette.primary.main} fontWeight={700}>
            Skills
          </Typography>
          <ToggleButtonGroup
            orientation="vertical"
            value={selectedSkills}
            onChange={handleSelection}
          >
            {data?.skills?.map((item: any, index: number) => (
              <ToggleButton
                key={index}
                value={item}
                aria-label={item}
                sx={{ my: 1, textAlign: "start", padding: 1 }}
              >
                <Box
                  display="flex"
                  flexDirection={"row"}
                  justifyContent={"start"}
                  alignItems={"center"}
                >
                  {/* <FormControl fullWidth >
                <FormControlLabel control={<Checkbox />} label={item} />
              </FormControl> */}
                  <Typography
                    textTransform={"capitalize"}
                    textAlign={"start"}
                    fontSize={14}
                    px={2}
                  >
                    {item}
                  </Typography>
                </Box>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          {/* {data?.skills?.map((item: any, index: number) => (
            <FormControlLabel
              key={index}
              sx={{ color: "black", fontSize: 13 }}
              control={<Checkbox />}
              label={<Typography fontSize={13}>{item}</Typography>}
            />
          ))} */}
        </Box>
      </Card>

      {/* Marital status card */}
      <Card sx={{ position: "relative", borderRadius: 4, mt: 1, p: 1 }}>
        <Box
          p={1}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"start"}
          alignItems={"start"}
        >
          <Typography color={theme.palette.primary.main} fontWeight={700}>
            Marital Status
          </Typography>
          <FormControl>
            <Grid
              container
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              component={RadioGroup}
            >
              {["Single", "Married", "Divorced", "Widowed"]?.map(
                (item: any, index: number) => (
                  <Grid item xs={6} sm={6}>
                    <FormControlLabel
                      key={index}
                      value={item}
                      onChange={(e, checked) => {
                        console.log("M STATUS :: " + item, checked);
                        dispatch(setFilterMaritalStatus(item));
                      }}
                      sx={{ color: "black", fontSize: 11 }}
                      control={<Radio />}
                      label={<Typography fontSize={13}>{item}</Typography>}
                    />
                  </Grid>
                )
              )}
            </Grid>
          </FormControl>
        </Box>
      </Card>

      {/* Age card */}
      <Card sx={{ position: "relative", borderRadius: 4, mt: 1, p: 1 }}>
        <Box
          p={1}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"start"}
          alignItems={"start"}
        >
          <Typography color={theme.palette.primary.main} fontWeight={700}>
            Age
          </Typography>
          <FormControl>
            <Grid
              container
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              component={RadioGroup}
            >
              {["18 - 25", "26 - 35", "36 - 50", "50+"]?.map(
                (item: any, index: number) => (
                  <Grid item xs={6} sm={6}>
                    <FormControlLabel
                      key={index}
                      value={item}
                      onChange={(e, checked) => {
                        console.log("AGE STATUS :: " + item, checked);
                        dispatch(setFilterAge(item));
                      }}
                      sx={{ color: "black", fontSize: 11 }}
                      control={<Radio />}
                      label={<Typography fontSize={13}>{item}</Typography>}
                    />
                  </Grid>
                )
              )}
            </Grid>
          </FormControl>
        </Box>
      </Card>

      <RoundedButton
        fullWidth
        sx={{
          height: 36,
          bgcolor: theme.palette.primary.main,
          mt: 2,
          color: "white",
          p: 1,
        }}
        onClick={filter}
      >
        Apply Filter
      </RoundedButton>
    </Box>
  );
}
