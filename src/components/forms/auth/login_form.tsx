import * as React from "react";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import { IconButton, InputAdornment, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
// import CustomTextField from "../../inputs/text_field";
import { FormikProvider, useFormik, Form } from "formik";

import "react-phone-input-2/lib/material.css";
import RoundedButton from "../../button/round_button";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useAppDispatch } from "../../../utils/hooks/apphook";
import { useNavigate } from "react-router-dom";
import APIService from "../../../service";
import { setLoading } from "../../../redux/reducers/loader";
import { toast } from "react-hot-toast";
import { setAuth, setProfile } from "../../../redux/reducers/auth";

interface RegState {
  emailAddress: string;
  password: string;
}

export default function LoginForm() {
  // const [deviceType, setDeviceType] = React.useState("mobile");
  const [showPassword, setShowPassword] = React.useState(false);
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // const mobile = useMediaQuery(theme.breakpoints.only("xs"));
  // const tablet = useMediaQuery(theme.breakpoints.only("sm"));

  // React.useEffect(() => {
  //   if (mobile) {
  //     setDeviceType("mobile");
  //   } else if (tablet) {
  //     setDeviceType("tablet");
  //   } else {
  //     setDeviceType("pc");
  //   }
  // }, []);

  const initValues: RegState = {
    emailAddress: "",
    password: "",
  };

  const registerSchema = Yup.object().shape({
    emailAddress: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: registerSchema,
    onSubmit: async () => {
      dispatch(setLoading(true));

      try {
        // const { phone, gender, ...rest } = Object.assign({}, values);
        const response = await APIService.post("/login", {
          email: values.emailAddress,
          password: values.password,
        });

        console.log("LOGIN SERVER RESPONSE:: ", response);
        dispatch(setLoading(false));
        dispatch(setAuth(true));
        dispatch(setProfile(response.data?.data))
        toast.success(`${response.data?.message}`)
        localStorage.setItem('x-toks', response?.data?.token)
        localStorage.setItem("auth-email", values.emailAddress);
        // dispatch
        navigate("/dashboard");
      } catch (err: any) {
        dispatch(setLoading(false));
        console.log("ERR MSG", err?.message || "Check internet");
        toast.error(err?.message || "Check your internet connection");
      }
    },
  });

  const { errors, touched, values, getFieldProps, handleSubmit } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form onSubmit={handleSubmit} style={{ width: "100%" }}  >
        <Box py={1} display={"flex"} flexDirection={"column"}>
          <TextField
            required
            fullWidth
            type="email"
            label="Email"
            size="small"
            variant="outlined"
            autoComplete="email-address"
            {...getFieldProps("emailAddress")}
            error={Boolean(touched.emailAddress && errors.emailAddress)}
            helperText={touched.emailAddress && errors.emailAddress}
          />
        </Box>

        <Box py={1}>
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Password"
            size="small"
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Box>

        <Box my={4}>
          <RoundedButton
            fullWidth
            variant="contained"
            size="small"
            type="submit"
            sx={{
              borderRadius: 36,
              textTransform: "capitalize",
              backgroundColor: theme.palette.primary.main,
              color: "white",
            }}
          >
            Continue with Email
          </RoundedButton>
        </Box>
      </Form>
    </FormikProvider>
  );
}
