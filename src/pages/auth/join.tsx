import {
  Box,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import brand from "../../assets/images/longo_dark.svg";
import { NavLink, useNavigate } from "react-router-dom";
import CustomCheckBox from "../../components/checkbox/btn_check";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RoundedButton from "../../components/button/round_button";

export default function JoinNow(): React.JSX.Element {
  const [isProfessional, setIsProfessional] = React.useState("");
  const [deviceType, setDeviceType] = React.useState("mobile");
  const theme = useTheme();
  const navigate = useNavigate();

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
  }, []);

  return (
    <Box bgcolor={"white"} height={"100vh"}>
      <img
        src={brand}
        alt=""
        width={86}
        style={{ padding: 10, cursor: "pointer" }}
        onClick={() => navigate("/")}
      />

      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: deviceType === "pc" ? 16 : 2,
          padding: 0,
        }}
      >
        <Box
          width={
            deviceType === "pc"
              ? "50%"
              : deviceType === "tablet"
              ? "60%"
              : "80%"
          }
          borderRadius={2}
          border={"0.5px solid #0066F5;"}
          p={2}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"start"}
          alignItems={"center"}
        >
          <Typography pt={2} fontSize={"1.5rem"}>
            Join as a recruiter or professional
          </Typography>
          <br />
          <Grid
            padding={deviceType === "pc" ? 4 : 0}
            container
            spacing={2}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item xs={12} sm={6}>
              <CustomCheckBox
                sx={{
                  width: "100%",
                  border:
                    isProfessional === "no"
                      ? "1.5px solid #0066F5"
                      : "1.5px solid #eee",
                  backgroundColor:
                    isProfessional === "no" ? "#2780fc3a" : "transparent",
                }}
                onClick={() => setIsProfessional("no")}
              >
                <Box
                  width={"100%"}
                  display={"flex"}
                  padding={1}
                  flexDirection={"column"}
                  justifyContent={"start"}
                  alignItems={"stretch"}
                >
                  <Box
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"end"}
                    alignItems={"end"}
                  >
                    <RadioButtonCheckedIcon
                      sx={{
                        color:
                          isProfessional === "no"
                            ? theme.palette.primary.main
                            : "grey",
                      }}
                    />
                  </Box>
                  <br />
                  <Typography
                    variant="h6"
                    fontSize={"1.25rem"}
                    textTransform={"initial"}
                    color={"black"}
                    gutterBottom
                  >
                    I'm a recruiter looking for a professional
                  </Typography>
                </Box>
              </CustomCheckBox>
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomCheckBox
                sx={{
                  width: "100%",
                  border:
                    isProfessional === "no" || isProfessional === ""
                      ? "1.5px solid #eee"
                      : "1.5px solid #0066F5",
                  backgroundColor:
                    isProfessional === "no" || isProfessional === ""
                      ? "transparent"
                      : "#2780fc3a",
                }}
                onClick={() => setIsProfessional("yes")}
              >
                <Box
                  width={"100%"}
                  display={"flex"}
                  padding={1}
                  flexDirection={"column"}
                  justifyContent={"start"}
                  alignItems={"stretch"}
                >
                  <Box
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"end"}
                    alignItems={"end"}
                  >
                    <RadioButtonCheckedIcon
                      sx={{
                        color:
                          isProfessional === "yes"
                            ? theme.palette.primary.main
                            : "grey",
                      }}
                    />
                  </Box>
                  <br />
                  <Typography
                    variant="h6"
                    fontSize={"1.25rem"}
                    textTransform={"initial"}
                    color={"black"}
                    gutterBottom
                  >
                    I'm a professional looking for a project
                  </Typography>
                </Box>
              </CustomCheckBox>
            </Grid>
          </Grid>
          <br />
          <RoundedButton
            disabled={isProfessional === ""}
            sx={{
              backgroundColor:
                isProfessional === "" ? "#eee" : theme.palette.primary.main,
              color: "white",
              width: deviceType === "pc" ? "50%" : "70%",
            }}
            onClick={() => {
              if (isProfessional === "no") {
                navigate("/signup/recruiter", { state: { accountType: "recruiter" } });
              }
              else {
                navigate("/signup/professional", { state: { accountType: "professional" } });
              }
            }}
          >
            {isProfessional === "yes"
              ? "Apply as a professional"
              : isProfessional === "no"
              ? "Join as a recruiter"
              : "Continue"}
          </RoundedButton>
          <Box
            width={"100%"}
            display={"flex"}
            padding={2}
            flexDirection={"row"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography px={1}>Already have an account?</Typography>
            <NavLink to={"/login"}>Login</NavLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
