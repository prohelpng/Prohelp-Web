import { ArrowForwardIos, ChevronRight } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  List,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React from "react";
import theme from "../../assets/theme/Theme";
import { useAppSelector } from "../../utils/hooks/apphook";
import CustomizedDialog from "../../components/dialog";
import LocationContent from "./location_body";
import RoundedButton from "../../components/button/round_button";

interface AllFilterProps {
  data: any;
}

//  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
export default function AllFilter({ data }: AllFilterProps) {
  const filterLocation = useAppSelector((state) => state.users.filterLocation);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  return (
    <Box
      p={2}
      display="flex"
      flexDirection="column"
      justifyContent={"start"}
      alignItems={"stretch"}
      component={List}
    >
      <CustomizedDialog
        open={openDialog}
        setOpen={setOpenDialog}
        title="Select location of interest"
        body={<LocationContent setOpen={setOpenDialog} />}
      />
      <br />
      <Card
        sx={{
          border: "none",
          bgcolor: "white",
          boxShadow:
            "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
          padding: 1,
        }}
        raised={true}
        elevation={2}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent={"space-between"}
          alignItems={"center"}
          component={Button}
          textTransform={"none"}
          width={"100%"}
          onClick={() => setOpenDialog(true)}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent={"start"}
            alignItems={"start"}
          >
            <Typography color={"black"} fontSize={12}>
              {" "}
              Location
            </Typography>
            <Typography color={theme.palette.primary.main} gutterBottom>
              {filterLocation}
            </Typography>
          </Box>
          <ChevronRight fontSize="small" />
        </Box>
      </Card>

      <br />
      <Card
        sx={{
          border: "none",
          bgcolor: "white",
          boxShadow:
            "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
          padding: 1,
        }}
        raised={true}
        elevation={2}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent={"start"}
          alignItems={"start"}
          textTransform={"none"}
          color={"black"}
          p={1}
        >
          <Typography fontSize={12}> Skills</Typography>
          {data?.skills?.map((item: any, index: number) => (
            <FormControlLabel
              key={index}
              sx={{ color: "black", fontSize: 11 }}
              control={<Checkbox />}
              label={<Typography fontSize={13}>{item}</Typography>}
            />
          ))}
        </Box>
      </Card>

      <br />
      <Card
        sx={{
          border: "none",
          bgcolor: "white",
          boxShadow:
            "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
          padding: 1,
        }}
        raised={true}
        elevation={2}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent={"start"}
          alignItems={"start"}
          textTransform={"none"}
          color={"black"}
          p={1}
        >
          <Typography fontSize={12}>Marital Status</Typography>
          <FormControl>
            <Grid
              container
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              component={RadioGroup}
            >
              {["Single", "Married", "Divorced", "Widowed"]?.map(
                (item: any, index: number) => (
                  <Grid item xs={6} sm={6}>
                    <FormControlLabel
                      key={index}
                      value={item}
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

      <br />
      <Card
        sx={{
          border: "none",
          bgcolor: "white",
          boxShadow:
            "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
          padding: 1,
        }}
        raised={true}
        elevation={2}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent={"start"}
          alignItems={"start"}
          textTransform={"none"}
          color={"black"}
          p={1}
        >
          <Typography fontSize={12}>Age</Typography>
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
      <br />
      <Box
        display="flex"
        flexDirection="row"
        justifyContent={"space-between"}
        alignItems={"center"}
        textTransform={"none"}
      >
        <Button
          disabled
          variant="outlined"
          sx={{ flex: 1, mr: 2, textTransform: "capitalize" }}
        >
          Clear Filter
        </Button>
        <Button
          variant="contained"
          sx={{ flex: 1, ml: 2, textTransform: "capitalize" }}
        >
          Apply Filter
        </Button>
      </Box>
    </Box>
  );
}
