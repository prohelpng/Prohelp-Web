import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { setFilterLocation } from "../../redux/reducers/users";
import { statesAlphabetic } from "../../utils/data/locations";
import { useAppDispatch } from "../../utils/hooks/apphook";

interface LCProps {
    setOpen: any;
}

export default function LocationContent({setOpen} : LCProps) {
    const dispatch = useAppDispatch();
    
  return (
    <Box p={4}>
      <Button
        sx={{ textTransform: "none", color: "black" }}
        onClick={() => {
          dispatch(setFilterLocation("All of Nigeria"));
          setOpen(false);
        }}
      >
        The whole of Nigeria
      </Button>
      <Grid container spacing={2}>
        {statesAlphabetic.map((item, index: number) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <Box
              py={2}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"start"}
              alignItems={"start"}
            >
              <Typography px={1} fontWeight={800} variant="h6" gutterBottom>
                {item?.letter}
              </Typography>
              {item?.states?.map((elem, key: number) => (
                <Button
                  sx={{
                    textTransform: "none",
                    color: "black",
                    justifyContent: "flex-start",
                  }}
                  key={key}
                  onClick={() => {
                    dispatch(setFilterLocation(elem));
                    setOpen(false);
                  }}
                >
                  {elem}
                </Button>
              ))}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
