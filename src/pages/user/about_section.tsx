import {
  Box,
  Button,
  Card,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import noDataImage from "../../assets/images/empty.png";
import { Add, Edit } from "@mui/icons-material";
import React from "react";
import { BrandedDialog } from "../../components/dialog";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/apphook";
import { setLoading } from "../../redux/reducers/loader";
import APIService from "../../service";
import { setProfile } from "../../redux/reducers/auth";
import toast from "react-hot-toast";
// import profile from "./profile";
import RoundedButton from "../../components/button/round_button";

interface Props {
  about: any;
  from?: string;
  setOpen?: any;
  userProfile?: any;
}

export default function AboutSection(props: Props) {
  let { about, from } = props;
  const [open, setOpen] = React.useState(false);

  const profile = useAppSelector((state: any) => state.auth.profile);

  return (
    <Card>
      <BrandedDialog
        open={open}
        setOpen={setOpen}
        title={
          about ? "Update brief introduction " : "Add a brief introduction "
        }
        body={
          !about ? (
            <RenderAddAbout
              about={about}
              userProfile={profile}
              setOpen={setOpen}
            />
          ) : (
            <p>Update skill here...</p>
          )
        }
      />
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"start"}
        alignItems={"start"}
        p={2}
      >
        <Box
          py={1}
          width={"100%"}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h6" fontWeight={500} gutterBottom>
            About
          </Typography>
          {about && from && (
            <IconButton>
              <Edit />
            </IconButton>
          )}
        </Box>
        {about ? (
          <Typography variant="body2" gutterBottom>
            {about}
          </Typography>
        ) : (
          <Box
            p={4}
            width={"100%"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <img src={noDataImage} alt="" width={100} />
            <Typography>No data found</Typography>
            {from && (
              <Button startIcon={<Add />} onClick={() => setOpen(true)}>
                Add{" "}
              </Button>
            )}
          </Box>
        )} 
      </Box>
    </Card>
  );
}

function RenderAddAbout({ userProfile, setOpen }: Props) {
  const [about, setAbout] = React.useState("");

  const dispatch = useAppDispatch();
  const theme = useTheme();

  const handleChange = (e: any) => {
    const { value } = e.target;
    setAbout(value);
  };

  const saveAbout = async () => {
    try {
      dispatch(setLoading(true));
      const payload = {
        bio: {
          ...userProfile?.bio,
          about: about,
        },
      };

      const res = await APIService.update("/updateuser", userProfile?.email, {
        ...payload,
      });

      console.log("NEW RESPONSE :: ", res);
      dispatch(setLoading(false));
      // Update profile
      dispatch(setProfile(res?.data?.data));
      toast.success(`${res.data?.message}`);

      setOpen(false);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return (
    <Box p={4}>
      <TextField
        value={about}
        fullWidth
        type="text"
        variant="outlined"
        placeholder="Tell us about you"
        multiline
        minRows={4}
        maxRows={10}
        inputProps={{ maxLength: 200 }}
        onChange={handleChange}
      />
      <RoundedButton
        fullWidth
        disabled={!about}
        variant="contained"
        sx={{ bgcolor: theme.palette.primary.main, color: "white", mt: 2 }}
        onClick={saveAbout}
      >
        Save Changes
      </RoundedButton>
    </Box>
  );
}
