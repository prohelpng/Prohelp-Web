import * as React from "react";
import {
  Box,
  Button,
  Card,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import googleBrand from "../../assets/images/google_logo.png";
import DividerText, {
  DividerLongText,
} from "../../components/divider/text_divider";
// import LoginForm from "../../components/forms/auth/login_form";
import LoginFormDialog, {
  MDialogProps,
} from "../../components/forms/auth/login_form2";

export default function LoginDialogContent(
  props: MDialogProps
): React.JSX.Element {
  const navigate = useNavigate();
  const { open, setOpen } = props;
  const [deviceType, setDeviceType] = React.useState("mobile");
  const theme = useTheme();

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

  return (
    <Box bgcolor={"white"} height={"100%"}>
      <Box height={"100%"}>
        <Card>
          <Box
            padding={deviceType !== "mobile" ? 4 : 2}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"start"}
            alignItems={"center"}
          >
            <Typography mb={4} fontWeight={600} variant="h5" gutterBottom>
              Login to Your Prohelp Account
            </Typography>

            <LoginFormDialog open={open} setOpen={setOpen} />

            <Box mb={3} width={deviceType === "mobile" ? "100%" : "70%"}>
              <DividerText />
            </Box>

            <Button
              fullWidth
              variant="contained"
              sx={{
                mb: 4,
                borderRadius: 36,
                textTransform: "capitalize",
                p: 1,
              }}
            >
              <Box
                bgcolor={"white"}
                width={32}
                height={32}
                p={2}
                borderRadius={16}
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"center"}
                alignItems={"center"}
                position={"absolute"}
                left={2}
              >
                <img src={googleBrand} alt="" width={21} />
              </Box>
              <Typography>Continue with Google</Typography>
            </Button>

            <DividerLongText label=" Don't have an account?" />
            <Button
              variant="outlined"
              onClick={() => navigate("/signup")}
              sx={{
                borderRadius: 32,
                mt: 2,
                width: 128,
                textTransform: "capitalize",
              }}
            >
              Signup
            </Button>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
