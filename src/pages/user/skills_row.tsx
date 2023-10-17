import {
  Box,
  Chip,
  Divider,
  IconButton,
  Slider,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import theme from "../../assets/theme/Theme";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/apphook";
import { Add, Edit } from "@mui/icons-material";
import { BrandedDialog } from "../../components/dialog";
import React from "react";
import RoundedButton from "../../components/button/round_button";
import APIService from "../../service";
import { setLoading } from "../../redux/reducers/loader";
import toast from "react-hot-toast";
import { setProfile } from "../../redux/reducers/auth";

interface Props {
  skills: any;
  from?: string;
  setOpen?: any;
  userProfile?: any;
  deviceType?: string;
}

export default function SkillsRow(props: Props) {
  let { skills, from, deviceType } = props;
  const [open, setOpen] = React.useState(false);
  const [currentProfession, setCurrentProfession] = React.useState<any>();

  const profile = useAppSelector((state) => state.auth.profile);
  const professions = useAppSelector((state) => state.professions.professions);

  React.useEffect(() => {
    if (professions) {
      const pro = professions?.filter(
        (item: any) =>
          item?.name.toLowerCase() === profile?.profession.toLowerCase()
      );
      console.log("PROFEESIONS :: ", pro);

      setCurrentProfession(pro[0]);
    }
  }, [professions, profile?.profession]);

  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      justifyContent={from ? "space-between" : "start"}
      alignItems={"center"}
      pb={1}
      width={"100%"}
    >
      <BrandedDialog
        open={open}
        setOpen={setOpen}
        title={skills?.length < 1 ? "Choose a skill " : "Change your skill"}
        body={
          skills?.length < 1 ? (
            <RenderAddSkills
              skills={currentProfession?.skills}
              userProfile={profile}
              setOpen={setOpen}
            />
          ) : (
            <p>Update skill here...</p>
          )
        }
      />
      <Box flex={1}>
        {skills?.length > 0 ? (
          skills?.map((item: any, key: number) => (
            <Chip key={key} label={item?.name} sx={{mr: 0.5, }}  />
      
          ))
        ) : (
          <Typography>You have not added any skills yet</Typography>
        )}
      </Box>
      {from && (
        <IconButton onClick={() => setOpen(true)}>
          {skills?.length < 1 ? <Add /> : <Edit />}
        </IconButton>
      )}
    </Box>
  );
}

const RenderAddSkills = ({ skills, userProfile, setOpen }: Props) => {
  const marks = [
    {
      value: 0,
      label: "0%",
    },
    {
      value: 20,
      label: "20%",
    },
    {
      value: 40,
      label: "40%",
    },
    {
      value: 60,
      label: "60%",
    },
    {
      value: 80,
      label: "80%",
    },
    {
      value: 100,
      label: "100%",
    },
  ];
  const [selectedSkills, setSelectedSkills] = React.useState<string[]>(
    () => []
  );

  const [indexer, setIndexer] = React.useState<string[]>(() => []);

  const dispatch = useAppDispatch();

  let arrs: any = [];
  // React.useState<string[]>([]);

  const handleSelection = (
    event: React.MouseEvent<HTMLElement>,
    newSkills: string[]
  ) => {
    setSelectedSkills(newSkills);
    setIndexer(newSkills);
    console.log("SKILL ==>> ", newSkills);
  };

  function valuetext(value: number) {
    return `${value}%`;
  }

  function valueLabelFormat(value: number) {
    return marks.findIndex((mark) => mark.value === value) + 1;
  }

  async function saveSkills() {
    const payload = {
      skills: [...userProfile?.skills, ...arrs],
    };

    console.log("PAYLOAD", payload);

    try {
      dispatch(setLoading(true));
      const res = await APIService.update("/updateuser", userProfile?.email, {
        ...payload,
      });

      console.log("NEW RESPONSE :: ", res);
      dispatch(setLoading(false));
      // Update profile 
      dispatch(setProfile(res?.data?.data))
      toast.success(`${res.data?.message}`)

      setOpen(false)
    } catch (err) {
      dispatch(setLoading(false));
    }
  }

  return (
    <Box p={4}>
      <Typography gutterBottom>
        Choose any skills you possess among the skills listed below
      </Typography>
      <Box py={1}>
        <ToggleButtonGroup
          orientation="vertical"
          value={selectedSkills}
          onChange={handleSelection}
        >
          {skills?.map((item: any, index: number) => (
            <ToggleButton
              key={index}
              value={item}
              aria-label={item}
              sx={{ my: 1, textAlign: "start" }}
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
      </Box>
      <Divider orientation="horizontal" />
      <Box py={1}>
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography gutterBottom fontWeight={700}>
            Selected Skills
          </Typography>
          <Typography gutterBottom fontWeight={700}>
            Proficiency
          </Typography>
        </Box>
        {selectedSkills?.map((item: string, index: number) => {
          return (
            <Box
              key={index}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography fontSize={14} flex={1} fontWeight={500}>
                {item}
              </Typography>
              <Slider
                sx={{ flex: 1 }}
                aria-label="Restricted values"
                defaultValue={0}
                valueLabelFormat={valueLabelFormat}
                getAriaValueText={valuetext}
                step={10}
                valueLabelDisplay="off"
                marks={marks}
                onChange={(e: any, val) => {
                  console.log("SLIDER :: ", val);
                  let obj = {
                    name: item,
                    proficiency: val.toString(),
                  };

                  if (arrs.length > 0) {
                    const exists = arrs.some(
                      (elem: any) =>
                        elem.name.toLowerCase() === item.toLowerCase()
                    );

                    if (exists) {
                      console.log("YES IT DOES");
                      // arrs[currIndex].proficiency = val
                      arrs?.forEach((it: any, key: number) => {
                        if (arrs[key]?.name === selectedSkills[index]) {
                          // Remove this one and update
                          it.proficiency = val.toString();
                        }
                      });
                    } else {
                      console.log("NO IT DOESN'T");
                      arrs.push(obj);
                    }
                  } else {
                    arrs.push(obj);
                  }

                  console.log("ARRESS ==>>", arrs);
                }}
              />
            </Box>
          );
        })}
      </Box>

      <Box py={2}>
        <RoundedButton
          disabled={selectedSkills?.length < 1}
          fullWidth
          variant="contained"
          sx={{ bgcolor: theme.palette.primary.main, color: "white" }}
          onClick={() => saveSkills()}
        >
          Save Changes
        </RoundedButton>
      </Box>
    </Box>
  );
};
