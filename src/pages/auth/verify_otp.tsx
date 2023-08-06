import {
  AppBar,
  Box,
  Button,
  Card,
  Container,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/apphook";
import { setLoading } from "../../redux/reducers/loader";
import OtpInput from "react-otp-input";
import APIService from "../../service";
import { toast } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import brand from "../../assets/images/longo_dark.svg";
import { DividerLongText } from "../../components/divider/text_divider";

interface OTPState {
  code: string;
}

export default function VerifyOTP(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector((state) => state.loader.isLoading);
  const OTP_LENGTH = 6;
  const initValues: OTPState = {
    code: "",
  };

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
  }, []);

  const formik = useFormik({
    initialValues: initValues,
    // validationSchema: registerSchema,
    onSubmit: async () => {
      dispatch(setLoading(true));

      try {
        // const { phone, gender, ...rest } = Object.assign({}, values);
        const response = await APIService.fetcher(
          `/verifyOTP?code=${values.code}&email=${localStorage.getItem(
            "auth-email"
          )}`
        );

        console.log("VERIFY RESPO:: ", response);
        localStorage.setItem("x-toks", response?.data?.token);
        dispatch(setLoading(false));
        toast.success(response.message ?? "Success");
        navigate("/dashboard");
      } catch (err: any) {
        console.log(err?.message || "Check internet");
        toast.error(err?.message || "Check your internet connection");
      }
    },
  });

  const {
    errors,
    touched,
    values,
    getFieldProps,
    handleSubmit,
    setFieldValue,
  } = formik;

  const resendCode = async () => {
    try {
      dispatch(setLoading(true));
      const response = await APIService.fetcher(
        `/resendOTP?code=${values.code}&email=${localStorage.getItem(
          "auth-email"
        )}`
      );

      console.log("RESEND OTP RESPO:: ", response);
      dispatch(setLoading(false));
      toast.success(response.message ?? "Success");
    } catch (err: any) {
      console.log(err?.message || "Check internet");
      toast.error(err?.message || "Check your internet connection");
    }
  };

  return (
    <Box
      height={"100vh"}
      padding={deviceType === "pc" ? 5 : 0}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <AppBar
        elevation={0.0}
        position="fixed"
        sx={{ backgroundColor: "white" }}
      >
        <Toolbar>
          <Box
            width={"100%"}
            height={"100%"}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <img
              src={brand}
              alt=""
              width={100}
              style={{ padding: 10, cursor: "pointer" }}
              onClick={() => navigate("/")}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Container>
        <FormikProvider value={formik}>
          <Card
            sx={{
              p: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography mt={2} variant="h5" fontWeight={600}>
              Verify Account
            </Typography>
            <Form
              autoComplete="off"
              onSubmit={handleSubmit}
              style={{
                width:
                  deviceType === "pc"
                    ? "50%"
                    : deviceType === "tablet"
                    ? "70%"
                    : "100%",
                paddingBottom: 20,
                paddingTop: 24,
              }}
            >
              <Box style={{ marginBottom: 20 }}>
                <Typography variant="body1" color="text.secondary">
                  {`We sent an OTP to your mail (${localStorage.getItem(
                    "auth-email"
                  )}). Fill in the OTP sent to your mail.`}
                </Typography>
              </Box>

              <OtpInput
                value={values.code}
                onChange={(value) => {
                  let otpValue = "";
                  otpValue += value;
                  setFieldValue("code", value);
                  if (otpValue.length === OTP_LENGTH) {
                    return handleSubmit();
                  }
                }}
                inputType="number"
                shouldAutoFocus
                numInputs={OTP_LENGTH}
                inputStyle={{
                  width: "100%",
                  height:
                    deviceType === "mobile"
                      ? 36
                      : deviceType === "tablet"
                      ? 60
                      : 70,
                  marginRight: 5,
                  marginLeft: 5,
                  borderRadius: 8,
                  fontSize: 18,
                }}
                renderSeparator={<div style={{ padding: 2 }} />}
                renderInput={(props) => (
                  <input
                    disabled={loading}
                    // placeholder={
                    //   `${Boolean(touched.otp && errors.otp)}` ? `Error` : ""
                    // }
                    {...props}
                  />
                )}
              />
            </Form>
            <Toolbar />
            <Box width={"86%"}>
              <DividerLongText label="Didn't receive code?" />
            </Box>
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              pb={4}
              pt={2}
            >
              <Button
                variant="outlined"
                onClick={resendCode}
                sx={{
                  borderRadius: 32,
                  mt: 2,
                  width: 128,
                  textTransform: "capitalize",
                }}
              >
                Resend code
              </Button>
            </Box>
          </Card>
        </FormikProvider>
      </Container>
    </Box>
  );
}
