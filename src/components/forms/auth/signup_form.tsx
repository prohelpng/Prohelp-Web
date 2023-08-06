import * as React from "react";
import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Checkbox,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  NativeSelect,
  OutlinedInput,
  useTheme,
} from "@mui/material";
import Box from "@mui/material/Box";
// import CustomTextField from "../../inputs/text_field";
import { FormikProvider, useFormik, Form } from "formik";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import RoundedButton from "../../button/round_button";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useAppDispatch } from "../../../utils/hooks/apphook";
import { setLoading } from "../../../redux/reducers/loader";
import APIService from "../../../service";
import { useNavigate } from "react-router-dom";
import  { toast } from 'react-hot-toast';

interface RegState {
  emailAddress: string;
  firstname: string;
  lastname: string;
  middlename: string;
  password: string;
  phone: string;
  gender: string;
}

interface Props {
  accountType: string;
}

export default function SignupForm(props: Props) {
  const [deviceType, setDeviceType] = React.useState("mobile");
  const [showPassword, setShowPassword] = React.useState(false);
  const [accepted, setAccepted] = React.useState(false);
  let { accountType } = props;
  const theme = useTheme();
  const dispatch = useAppDispatch();
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

  const sex = [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
  ];

  const initValues: RegState = {
    emailAddress: "",
    firstname: "",
    lastname: "",
    password: "",
    middlename: "",
    phone: "",
    gender: "",
  };

  // const registerSchema = Yup.object().shape({
  //   emailAddress: Yup.string()
  //     .email("Email must be a valid email address")
  //     .required("Email is required"),
  //   password: Yup.string().required("Password is required"),
  //   firstname: Yup.string().required("First name is required"),
  //   lastname: Yup.string().required("Last name is required"),
  //   phone: Yup.string().required("Phone number is required"),
  // });

  const formik = useFormik({
    initialValues: initValues,
    // validationSchema: registerSchema,
    onSubmit: async () => {
      dispatch(setLoading(true));

      try {
        // const { phone, gender, ...rest } = Object.assign({}, values);
        const response = await APIService.post("/register", {
          email: values.emailAddress,
          phone: values.phone,
          source: "web",
          gender: values.gender,
          password: values.password,
          firstname: values.firstname,
          lastname: values.lastname,
          middlename: values.middlename,
          accountType: accountType,
        });

        // Save email in l storage
        localStorage.setItem("auth-email", values.emailAddress);
        console.log("SERVER RESPO:: ", response);
        dispatch(setLoading(false));
        navigate("/verify-otp");
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
      <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Box py={1} display={"flex"} flexDirection={"column"}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                required
                fullWidth
                type="text"
                label="First Name"
                variant="outlined"
                {...getFieldProps("firstname")}
                error={Boolean(touched.firstname && errors.firstname)}
                helperText={touched.firstname && errors.firstname}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                fullWidth
                type="text"
                label="Middle Name"
                variant="outlined"
                {...getFieldProps("middlename")}
                size={deviceType === "mobile" ? "small" : "medium"}
              />
            </Grid>
          </Grid>
        </Box>

        <Box py={1} display={"flex"} flexDirection={"column"}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                required
                fullWidth
                type="text"
                label="Last Name"
                variant="outlined"
                {...getFieldProps("lastname")}
                error={Boolean(touched.lastname && errors.lastname)}
                helperText={touched.lastname && errors.lastname}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                required
                fullWidth
                type="email"
                label="Email"
                variant="outlined"
                autoComplete="email-address"
                {...getFieldProps("emailAddress")}
                error={Boolean(touched.emailAddress && errors.emailAddress)}
                helperText={touched.emailAddress && errors.emailAddress}
              />
            </Grid>
          </Grid>
        </Box>

        <Box py={1} display={"flex"} flexDirection={"column"}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <PhoneInput
                country={"ng"}
                value={values.phone}
                onChange={(phone) => {}}
                placeholder="Enter phone number"
                inputProps={{
                  name: "phone",
                  required: true,
                  size: "small",
                  //   error: Boolean(touched.lastname && errors.lastname)}
                  // helperText: {touched.lastname && errors.lastname}
                }}
                inputStyle={{ width: "100%" }}
                defaultErrorMessage="Phone number is required"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <FormControl fullWidth>
                <InputLabel
                  htmlFor="gender"
                  sx={{ bgcolor: "background.paper" }}
                >
                  <span>Select your Gender</span>
                </InputLabel>
                <NativeSelect
                  input={
                    <OutlinedInput {...getFieldProps("gender")} id="gender" />
                  }
                  id="gender"
                >
                  {sex.map((gender) => (
                    <option key={gender.value} value={gender.value}>
                      {gender.label}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <Box py={1}>
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Password"
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

        <Box
          marginLeft={-1}
          width={"100%"}
          mb={2}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"start"}
          alignItems={"center"}
        >
          <Checkbox value={accepted} onChange={(e) => setAccepted(!accepted)} />
          <p style={{ textDecoration: "none", fontSize: "1rem" }}>
            Yes, I understand and agree to the Prohelp{" "}
            <a href="">Terms of Service</a> , including the{" "}
            <a href="">User Agreement</a> and <a href="">Privacy Policy</a> .
          </p>
        </Box>

        <Box mb={4}>
          <RoundedButton
            fullWidth
            disabled={!accepted}
            variant="contained"
            type="submit"
            sx={{
              borderRadius: 36,
              textTransform: "capitalize",
              backgroundColor: theme.palette.primary.main,
              color: "white",
            }}
          >
            Create My Account
          </RoundedButton>
        </Box>
      </Form>
    </FormikProvider>
  );
}
