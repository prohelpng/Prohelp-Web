import {
  Box,
  Card,
  Divider,
  Grid,
  Rating,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import banner from "../../assets/images/rodion.jpg";
import React from "react";
import theme from "../../assets/theme/Theme";
import { NavLink, useLocation } from "react-router-dom";
import { useAppSelector } from "../../utils/hooks/apphook";
import BadgeAvatar from "../../components/avatar/avatar_badge";
import ActionRow from "./action_row";
import SkillsRow from "./skills_row";
import AboutSection from "./about_section";
import ExperienceSection from "./experience_section";
import EducationSection from "./education_section";

export default function MyProfile() {
  const [deviceType, setDeviceType] = React.useState("mobile");
  const [professionBanner, setProfessionBanner] = React.useState(banner);

  const profile = useAppSelector((state) => state.auth.profile);
  const professions = useAppSelector((state) => state.professions.professions);

  const mobile = useMediaQuery(theme.breakpoints.only("xs"));
  const tablet = useMediaQuery(theme.breakpoints.only("sm"));

  React.useEffect(() => {
    if (mobile) {
      setDeviceType("mobile");
    } else if (tablet) {
      setDeviceType("tablet");
    } else {
      setDeviceType("pc");
    }
  }, [mobile, tablet]);

  React.useEffect(() => {
    if (professions) {
      const pro = professions?.filter(
        (item: any) =>
          item?.name.toLowerCase() === profile?.profession.toLowerCase()
      );
    //   console.log("PROF : ", pro);
      setProfessionBanner(pro[0]?.image);
    }
  }, [professions, profile?.profession]);

  const pluralizer = (num: number) => {
    return num > 1 ? "s" : "";
  };

  return (
    <Grid container spacing={deviceType === "pc" ? 4 : 2}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Card>
          <Box
            width={"100%"}
            height={256}
            paddingX={deviceType === "mobile" ? 1.8 : 3}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"end"}
            sx={{
              backgroundImage: "url(" + professionBanner + ")",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          >
            <BadgeAvatar image={profile?.bio?.image} />
          </Box>
          <Toolbar />
          <Grid
            container
            spacing={0}
            p={2}
            display="flex"
            flexDirection="row"
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={7}
              color={"black"}
              textTransform={"capitalize"}
            >
              <Typography fontWeight={700} fontSize={"1.25rem"} color={"black"}>
                {`${profile?.bio?.firstname} ${profile?.bio?.middlename} ${profile?.bio?.lastname}`}
              </Typography>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent={"start"}
                alignItems={"center"}
              >
                <Typography variant="body2" color={"black"}>
                  {`${profile?.profession}`}
                </Typography>
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    bgcolor: "grey",
                    mx: 1,
                  }}
                />
                <NavLink
                  to={""}
                  style={{
                    textDecoration: "none",
                    fontSize: 16,
                    fontFamily: "sans-serif",
                    color: theme.palette.primary.main,
                    textTransform: "lowercase",
                  }}
                >
                  {`${profile?.connections?.length}connection${pluralizer(
                    profile?.connections?.length
                  )}`}
                </NavLink>
              </Box>
              <Typography variant="body2" gutterBottom color={"black"}>
                {`${profile?.address?.city}, ${profile?.address?.state}, ${profile?.address?.country}`}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={5}
              display="flex"
              flexDirection="column"
              justifyContent={deviceType === "pc" ? "end" : "start"}
              alignItems={"end"}
            >
              <Box
                width={"100%"}
                display="flex"
                flexDirection="row"
                justifyContent={deviceType === "pc" ? "end" : "start"}
                alignItems={"center"}
              >
                <Rating
                  name="read-only"
                  value={profile?.rating ?? 1.0}
                  readOnly
                />
                <Typography>{`(${profile?.reviews?.length} review${pluralizer(
                  profile?.review$?.length
                )})`}</Typography>
              </Box>
            </Grid>
          </Grid>
          <Box px={2} pb={4} width={"100%"}>
            <SkillsRow skills={profile?.skills ?? []} from="myprofile" />
            <ActionRow deviceType={deviceType} />
          </Box>
        </Card>
        <Divider />
        <AboutSection about={profile?.bio?.about} from="myprofile" />
        <Divider />
        <ExperienceSection experience={profile?.experience} />
        <Divider />
        <EducationSection education={profile?.education} />
      </Grid>
    </Grid>
  );
}
