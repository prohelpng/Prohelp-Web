import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
// import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// import parse from "autosuggest-highlight/parse";
// import { useAppSelector } from "../../utils/hooks/apphook";
// import { useSWR } from "swr";
import APIService from "../../service";
import { useMediaQuery, useTheme } from "@mui/material";

// import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useNavigate } from "react-router-dom";
import RoundedButton from "../button/round_button";
import { LocationOn, SearchTwoTone } from "@mui/icons-material";
import { myLocations } from "../../utils/data/locations";

export default function MyAutoComplete() {
  const [mLocation, setLocation] = React.useState<string | null>(null);
  // const [inputValue, setInputValue] = React.useState("");
  // const [options, setOptions] = React.useState<string[] | null>();
  const [deviceType, setDeviceType] = React.useState("mobile");
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  // const loaded = React.useRef(false);
  const navigate = useNavigate();

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only("xs"));
  const tablet = useMediaQuery(theme.breakpoints.only("sm"));

  const searchFetcher = async (key: string) => {
    try {
      if (mLocation === null || mLocation === undefined) {
        let resp = await APIService.fetcher("/searching/" + key);
        console.log(resp);
        navigate("/searchresults/" + key, {
          state: {
            data: resp?.data,
            searchTerm: key,
            searchLocation: mLocation,
          },
        });
      } else {
        let resp = await APIService.fetcher(
          "/searching/" + key + "?location=" + mLocation
        );
        console.log(resp);
        navigate("/searchresults/" + key, {
          state: {
            data: resp?.data,
            searchTerm: key,
            searchLocation: mLocation,
          },
        });
      }
      // setOptions(resp?.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (mobile) {
      setDeviceType("mobile");
    } else if (tablet) {
      setDeviceType("tablet");
    } else {
      setDeviceType("pc");
    }
  }, [mobile, tablet]);

  // React.useEffect(() => {
  //   if (inputValue === "") {
  //     setOptions(myLocations ?? []);
  //     return undefined;
  //   }
  // }, [mLocation, inputValue]);

  // console.log("LOCA :: ", mLocation);

  return (
    <Box
      pl={1.5}
      border="1px solid"
      borderColor={theme.palette.primary.light}
      borderRadius={32}
      display="flex"
      bgcolor={"white"}
      color={"black"}
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <TextField
        fullWidth
        variant="standard"
        size="small"
        placeholder="Search for any service here ..."
        sx={{ border: "none", borderRadius: 32, width: "100%" }}
        onChange={(e) => {
          setSearchTerm(e?.target?.value);
        }}
        InputProps={{
          disableUnderline: true,
          style: {
            color: "black",
          },
          startAdornment: <SearchTwoTone />,
        }}
      />
      <div style={{ color: "red", width: 10, backgroundColor: "blue" }} />
      <Autocomplete
        id="prohelp-search-demo"
        sx={{
          width: "50%",
          minWidth: 75,
          maxWidth: "70%",
          color: "white",
          display: "inline-block",
          "& input": {
            width: 200,
            color: "black",
            border: "none",
          },
        }}
        getOptionLabel={(option: string) => option}
        // filterOptions={(x) => x}
        options={myLocations}
        autoComplete
        value={mLocation}
        autoHighlight
        noOptionsText="No data found"
        onChange={(event: any, newValue) => {
          // setOptions(options);
          setLocation(newValue);
        }}
        // onInputChange={(event, newInputValue) => {
        //   setInputValue(newInputValue);
        //   console.log("Picked NOW");
        // }}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            // value={value}
            variant="standard"
            size="small"
            InputProps={{
              ...params.InputProps,
              disableUnderline: true,
              autoComplete: "new-password",
            }}
            placeholder={"Location "}
            sx={{
              border: "none",
              borderRadius: 32,
              width: "100%",
              color: "white",
            }}
            //   {...params}
            // label="Choose a country"
            // inputProps={{
            //   ...params.inputProps,
            //   autoComplete: 'new-password', // disable autocomplete and autofill
            // }}
          />
        )}
        renderOption={(props, option: string) => {
          return (
            <Box
              component={"li"}
              {...props}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"start"}
              alignItems={"center"}
              mx={-1}
              py={1}
            >
              <LocationOn fontSize="small" sx={{ color: "text.secondary" }} />
              <Typography
                textTransform={"capitalize"}
                color="text.secondary"
                fontSize={"0.75rem"}
                ml={1}
              >
                {`${option}`}
              </Typography>
            </Box>
          );
        }}
      />
      {deviceType === "mobile" && (
        <RoundedButton
          variant="contained"
          sx={{
            bgcolor: theme.palette.primary.main,
            color: "white",
            minWidth: 70,
          }}
        >
          Search
        </RoundedButton>
      )}
      <Box
        borderColor="white"
        borderRadius={32}
        bgcolor={"white"}
        display={deviceType === "mobile" ? "none" : "flex"}
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        padding={1}
        sx={{
          height: "100%",
          width: deviceType === "pc" ? 120 : deviceType === "tablet" ? 105 : 86,
        }}
      >
        <RoundedButton
          disabled={!searchTerm}
          variant="contained"
          sx={{
            bgcolor: theme.palette.primary.main,
            color: "white",
            minWidth:
              deviceType === "pc" ? 108 : deviceType === "tablet" ? 90 : 50,
          }}
          onClick={() => searchFetcher(searchTerm)}
        >
          Search
        </RoundedButton>
      </Box>
    </Box>
  );
}
