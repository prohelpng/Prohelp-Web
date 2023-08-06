import * as React from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Box from "@mui/system/Box";
import RoundedButton from "../button/round_button";
import { IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";

export default function SearchField() {
  return (
    <Box
      pl={1}
      border="1px solid"
      borderColor="white"
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
            color: "white",
          },
        }}
      />
      <RoundedButton sx={{ height: "100%", width: 128 }}>Search</RoundedButton>
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
