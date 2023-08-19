import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// import parse from "autosuggest-highlight/parse";
import { useAppSelector } from "../../utils/hooks/apphook";
// import { useSWR } from "swr";
import APIService from "../../service";
import { NativeSelect } from "@mui/material";

import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useNavigate } from "react-router-dom";


export default function GoogleMaps() {
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const [searchTarget, setSearchTarget] = React.useState("jobs");
  // const loaded = React.useRef(false);
  const navigate = useNavigate();

  const jobs = useAppSelector((state) => state.jobs.jobs);
  const professionals = useAppSelector((state) => state.users.professionals);

  const jobFetcher = async (key: string) => {
    try {
      let resp = await APIService.fetcher("/job/search/" + key);
      console.log(resp);
      setOptions(resp?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const proFetcher = async (key: string) => {
    try {
      let resp = await APIService.fetcher("/search/" + key);
      console.log(resp);
      setOptions(resp?.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {

    if (inputValue === "") {
      if (searchTarget === "jobs") {
        setOptions(value ? jobs?.docs : []);
        return undefined;
      } else {
        setOptions(value ? professionals?.docs : []);
        return undefined;
      }
    }

    if (searchTarget === "jobs") {
      jobFetcher(inputValue);
    } else {
      proFetcher(inputValue);
    }

  }, [value, inputValue, jobs?.docs, searchTarget, professionals?.docs]);

  return (
    <Box
      pl={1.5}
      border="1px solid"
      borderColor="white"
      borderRadius={32}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Autocomplete
        id="prohelp-search-demo"
        sx={{
          width: "100%",
          color: "white",
          display: "inline-block",
          "& input": {
            width: 200,
            color: "white",
            border: "none",
          },
        }}
        getOptionLabel={(option: any) =>
          typeof option === "string"
            ? option
            : searchTarget === "jobs"
            ? option.jobTitle
            : option?.bio?.firstname
        }
        filterOptions={(x) => x}
        options={options}
        autoComplete
        includeInputInList
        filterSelectedOptions
        value={value}
        noOptionsText="No data found"
        onChange={(event: any, newValue) => {
          setOptions(options);
          setValue(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          console.log("Picked NOW");
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            variant="standard"
            size="small"
            InputProps={{
              ...params.InputProps,
              disableUnderline: true
            }}
            placeholder={
              searchTarget === "jobs"
                ? "Search for any service  "
                : "Search for any professional "
            }
            sx={{
              border: "none",
              borderRadius: 32,
              width: "100%",
              color: "white",
            }}
          />
        )}
        renderOption={(props, option: any) => {
          return (
            <li
              {...props}
              onClick={() => {
                console.log("CGTH");
                if (searchTarget === "jobs") {
                  navigate("/jobs/" + option?.id, { state: { data: option } });
                }
                else {
                  navigate("/professionals/" + option?.id, {
                    state: { user: option },
                  });
                }
              }}
            >
              <Grid container alignItems="center">
                <Grid item sx={{ display: "flex", width: 44 }}>
                  <ArrowOutwardIcon sx={{ color: "text.secondary" }} />
                </Grid>
                <Grid
                  item
                  sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
                >
                  <Typography
                    textTransform={"capitalize"}
                    variant="body2"
                    color="text.secondary"
                  >
                    {`${
                      searchTarget === "jobs"
                        ? option?.jobTitle
                        : option?.bio?.firstname
                    }`}
                  </Typography>
                </Grid>
              </Grid>
            </li>
          );
        }}
      />
      <Box
        borderColor="white"
        borderRadius={32}
        bgcolor={"white"}
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        padding={1}
        sx={{ height: "100%", width: 128 }}
      >
        <NativeSelect
          disableUnderline
          defaultValue={30}
          inputProps={{
            name: "age",
            id: "uncontrolled-native",
          }}
          size="small"
          onChange={(e: any) => {
            setSearchTarget(e?.target?.value);
          }}
        >
          <option value={"jobs"}>Jobs</option>
          <option value={"pros"}>Pros</option>
        </NativeSelect>
      </Box>
    </Box>
  );
}
