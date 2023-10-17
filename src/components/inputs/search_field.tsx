import * as React from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Box from "@mui/system/Box";
import RoundedButton from "../button/round_button";
import { IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";
import theme from "../../assets/theme/Theme";
import { useNavigate } from "react-router-dom";
import APIService from "../../service";
import { useAppDispatch } from "../../utils/hooks/apphook";

interface SearchFielsProps {
  placeholder?: string;
  from?: string;
}

export default function SearchField({
  placeholder = "Search for any service here ...",
  from,
}: SearchFielsProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchKey, setSearchKey] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchKey(value);
  };

  const handleSearch = () => {
    // Now perform search
    APIService.fetcher("/job/search/" + searchKey)
      .then((res) => {
        console.log("RESULTS HERE ---== >> ", res);

        if (from === "explore") {
          navigate("/dashboard/search/"+searchKey);
        }
      })
      .catch((err) => {
        console.log("ERRO :: ", err);
      });
  };

  return (
    <Box
      pl={3}
      border="2px solid"
      borderColor={theme.palette.primary.light}
      borderRadius={32}
      bgcolor={theme.palette.primary.light}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <TextField
        fullWidth
        variant="standard"
        size="small"
        value={searchKey}
        onChange={handleChange}
        placeholder={placeholder}
        sx={{ border: "none", borderRadius: 32 }}
        InputProps={{
          disableUnderline: true,
          style: {
            color: "black",
            backgroundColor: "transparent",
          },
        }}
      />
      <RoundedButton
        sx={{
          height: "100%",
          width: 128,
          bgcolor: theme.palette.primary.main,
          color: "white",
        }}
        onClick={() => handleSearch()}
      >
        Search
      </RoundedButton>
    </Box>
  );
}

export function SearchFieldTop() {
  return (
    <Box
      pl={2}
      ml={4}
      mr={2}
      flexGrow={1}
      border="1px solid"
      borderColor="black"
      borderRadius={32}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <TextField
        fullWidth
        variant="standard"
        size="small"
        placeholder="Search for any service here ..."
        sx={{ border: "none", borderRadius: 32 }}
        InputProps={{
          disableUnderline: true,
          style: {
            color: "black",
          },
          endAdornment: (
            <IconButton>
              <Search fontSize="small" />
            </IconButton>
          ),
        }}
      />
    </Box>
  );
}
