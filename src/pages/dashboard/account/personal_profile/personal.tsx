import * as React from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import PhoneInput from "react-phone-input-2";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../utils/hooks/apphook";
import { statesCities } from "../../../../utils/data/locations";
import RoundedButton from "../../../../components/button/round_button";
import theme from "../../../../assets/theme/Theme";
import { PersonalProfileProps } from ".";
import * as Yup from "yup";
// import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { DesktopDatePicker } from "@mui/x-date-pickers";
import {
  storage,
  uploadBytesResumable,
  getDownloadURL,
} from "../../../../utils/firebase-config";
import { ref } from "firebase/storage";
import APIService from "../../../../service";
import { toast } from "react-hot-toast";
import { setLoading } from "../../../../redux/reducers/loader";
// import { DateField, DatePicker, DesktopDatePicker } from "@mui/x-date-pickers";

interface InitialState {
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  phone: string;
  gender: string;
  age: string;
  street: string;
  city: string;
  state: string;
  maritalStatus: string;
}

export default function Personal({ selectedFile }: PersonalProfileProps) {
  const profile = useAppSelector((state) => state.auth.profile);
  const [cities, setCities] = React.useState<string[]>([]);
  const dispatch = useAppDispatch();

  const profileSchema = Yup.object().shape({
    firstname: Yup.string().required("First name is required"),
    middlename: Yup.string().nullable(),
    lastname: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Email address is invalid")
      .required("Email address is required"),
    gender: Yup.string().required("Gender is required"),
    age: Yup.date().required("Date of birth is required"),
    street: Yup.string().required("Street address is required"),
    state: Yup.string().required("State of residence is required"),
    city: Yup.string().required("City of residence is required"),
    phone: Yup.string()
      .min(10, "Phone number format is incorrect")
      .max(14, "Phone number format is incorrect")
      .required("Phone number required"),
    maritalStatus: Yup.string().required("Marital status is required"),
  });

  const initialState: InitialState = {
    firstname: profile?.bio?.firstname ?? "",
    middlename: profile?.bio?.middlename ?? "",
    lastname: profile?.bio?.lastname ?? "",
    email: profile?.email,
    phone: profile?.bio?.phone ?? "",
    gender: profile?.bio?.gender ?? "",
    age: profile?.bio?.dob ?? new Date("01/01/2005"),
    street: profile?.address?.street ?? "",
    city: profile?.address?.city ?? "",
    state: profile?.address?.state ?? "",
    maritalStatus: profile?.bio?.maritalStatus ?? "",
  };

  React.useEffect(() => {
    if (profile?.address?.state) {
      const currObj = statesCities.filter(
        (item) =>
          item?.name.toLowerCase() === profile?.address?.state?.toLowerCase()
      );
      setCities(currObj[0].cities);
    }
  }, [profile?.address?.state]);

  // React.useEffect(() => {
  //   initialState.email = profile?.email ?? "";
  //   initialState.firstname = profile?.bio?.firstname ?? "";
  //   initialState.lastname = profile?.bio?.lastname ?? "";
  //   initialState.middlename = profile?.bio?.middlename ?? "";
  //   initialState.gender = profile?.bio?.gender ?? "";
  //   initialState.age = profile?.bio?.dob ?? "";
  //   initialState.street = profile?.address?.street ?? "";
  //   initialState.state = profile?.address?.state ;
  //   initialState.city = profile?.address?.city ?? "";
  //   initialState.maritalStatus = profile?.bio?.maritalStatus ?? "";
  // }, []);

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: profileSchema,
    onSubmit: async () => {
      // dispatch()
      if (selectedFile) {
        // Upload file to firebase first
        dispatch(setLoading(true));
        try {
          //First save to cloud storage here
          let storageRef = ref(storage, "photos/" + values.email);
          let uploadTask = uploadBytesResumable(storageRef, selectedFile);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const uprogress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              // setProgress(uprogress);
            },
            (error) => {
              // setIsUploading(false);
              console.log(error);
              // enqueueSnackbar(`${error.message}`, { variant: "error" });
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then(
                async (downloadURL) => {
                  const payload = {
                    bio: {
                      ...profile?.bio,
                      firstname: values.firstname,
                      middlename: values.middlename,
                      lastname: values.lastname,
                      gender: values.gender,
                      dob: values.age,
                      phone: values.phone,
                      image: downloadURL,
                    },
                    address: {
                      city: values.city,
                      state: values.state,
                      street: values.street,
                      country: "Nigeria",
                    },
                  };
                  try {
                    const res = await APIService.update(
                      "/updateuser",
                      values.email,
                      {
                        ...payload,
                      }
                    );

                    console.log("RESP HERE >>> ", `${res}`);
                    dispatch(setLoading(false));

                    toast.success("Operation successful");
                  } catch (error: any) {
                    dispatch(setLoading(false));
                    console.log(
                      "ERROR HERE >>> ",
                      `${
                        error?.response?.data?.message ||
                        error?.message ||
                        "Something went wrong, try again."
                      }`
                    );
                  }
                }
              );
            }
          );
        } catch (error: any) {
          dispatch(setLoading(false));
          console.log(
            "ERROR HERE >>> ",
            `${
              error?.response?.data?.message ||
              error?.message ||
              "Something went wrong, try again."
            }`
          );
        }
      } else {
        // Update profile direct
      }
    },
  });

  const {
    handleSubmit,
    handleChange,
    getFieldProps,
    values,
    errors,
    touched,
    setFieldValue,
  } = formik;

  return (
    <FormikProvider value={formik}>
      <Form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
        style={{ width: "100%" }}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"start"}
          alignItems={"stretch"}
        >
          <Grid
            container
            spacing={2}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                required
                variant="outlined"
                label="First Name"
                type="text"
                fullWidth
                size="small"
                {...getFieldProps("firstname")}
                error={Boolean(touched.firstname && errors.firstname)}
                helperText={touched.firstname && errors.firstname}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                variant="outlined"
                label="Middle Name"
                type="text"
                fullWidth
                size="small"
                {...getFieldProps("middlename")}
                error={Boolean(touched.middlename && errors.middlename)}
                helperText={touched.middlename && errors.middlename}
              />
            </Grid>
          </Grid>

          <br />

          <Grid
            container
            spacing={2}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                variant="outlined"
                type="text"
                fullWidth
                required
                label="Last Name"
                size="small"
                {...getFieldProps("lastname")}
                error={Boolean(touched.lastname && errors.lastname)}
                helperText={touched.lastname && errors.lastname}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                variant="outlined"
                type="email"
                fullWidth
                required
                label="Email Address"
                disabled
                size="small"
                {...getFieldProps("email")}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
            </Grid>
          </Grid>

          <br />

          <Grid
            container
            spacing={2}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item xs={12} sm={12} md={6}>
              <FormControl
                variant="outlined"
                fullWidth
                required
                error={Boolean(touched.phone && errors.phone)}
              >
                <PhoneInput
                  country={"ng"}
                  value={values.phone}
                  disableDropdown={true}
                  onChange={(phone) => {
                    const regex = /^[789]/;
                    let formatPhone = phone?.startsWith("0")
                      ? "234" + phone?.slice(1)
                      : regex.test(phone)
                      ? "234" + phone
                      : phone;
                    setFieldValue("phone", formatPhone);
                    // console.log("CHECKING :: ", formatPhone);
                    console.log("VP :: ", values.phone);
                    
                  }}
                  disableCountryCode={true}
                  placeholder="Enter phone number"
                  inputProps={{
                    required: true,
                  }}
                  inputStyle={{
                    width: "100%",
                    border: "1px solid",
                    height: 41,
                  }}
                />
                <FormHelperText>{touched.phone && errors.phone}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <FormControl
                fullWidth
                size="small"
                required
                error={Boolean(touched.gender && errors.gender)}
              >
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Gender"
                  {...getFieldProps("gender")}
                  error={Boolean(touched.gender && errors.gender)}
                >
                  {["Male", "Female"].map((gender, index: number) => (
                    <MenuItem key={index} value={`${gender}`.toLowerCase()}>
                      {gender}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {touched.gender && errors.gender}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>

          <br />

          <Grid
            container
            spacing={2}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item xs={12} sm={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  label="Age"
                  inputFormat="dd/MM/yyyy"
                  value={values.age}
                  disableFuture
                  // readOnly
                  // disableToolbar
                  // minDate={date}
                  maxDate={new Date("10/01/2005")}
                  onChange={(value) => {
                    console.log("CHECK VALUE", value);
                    setFieldValue("age", value);
                    // setDatePicked(true);
                  }}
                  renderInput={(params: any) => (
                    <TextField
                      fullWidth
                      required
                      inputProps={{
                        disabled: true,
                      }}
                      disabled={true}
                      size="small"
                      {...params}
                      placeholder="Enter date of birth"
                      error={Boolean(touched.age && errors.age)}
                      helperText={touched.age && errors.age}
                    />
                  )}
                  // style={{
                  //   "& .MuiPickersToolbar-penIconButton": { display: "none" },
                  // }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <FormControl
                fullWidth
                size="small"
                required
                error={Boolean(touched.maritalStatus && errors.maritalStatus)}
              >
                <InputLabel id="demo-simple-select-labeo">
                  Marital Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-labeo"
                  label="MArital Status"
                  {...getFieldProps("maritalStatus")}
                  error={Boolean(touched.maritalStatus && errors.maritalStatus)}
                  // helperText={touched.middlename && errors.middlename}
                >
                  {["Single", "Married", "Divorced", "Widowed"].map(
                    (status, index: number) => (
                      <MenuItem key={index} value={`${status}`.toLowerCase()}>
                        {status}
                      </MenuItem>
                    )
                  )}
                </Select>
                <FormHelperText>
                  {touched.maritalStatus && errors.maritalStatus}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>

          <br />

          <Grid
            container
            spacing={2}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item xs={12} sm={12} md={6}>
              <FormControl
                fullWidth
                size="small"
                required
                error={Boolean(touched.state && errors.state)}
              >
                <InputLabel id="demo-simple-select-la">State</InputLabel>
                <Select
                  labelId="demo-simple-select-la"
                  id="state-l"
                  label="State"
                  value={values.state}
                  onChange={(e) => {
                    handleChange("state");
                    const currObj = statesCities.filter(
                      (item) => item?.name.toLowerCase() === e?.target?.value
                    );
                    setCities(currObj[0].cities);
                  }}
                  error={Boolean(touched.state && errors.state)}
                  // helperText={touched.middlename && errors.middlename}
                >
                  <MenuItem value="">
                    <em>Select state</em>
                  </MenuItem>
                  {statesCities.map((state, index: number) => (
                    <MenuItem key={index} value={`${state?.name}`}>
                      {state?.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{touched.state && errors.state}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <FormControl
                fullWidth
                size="small"
                required
                error={Boolean(touched.city && errors.city)}
              >
                <InputLabel id="demo-simple-select-lab">City</InputLabel>
                <Select
                  labelId="demo-simple-select-lab"
                  id="demo-simple-select"
                  label="City"
                  {...getFieldProps("city")}
                  error={Boolean(touched.city && errors.city)}
                >
                  <MenuItem value="">
                    <em>Select city</em>
                  </MenuItem>
                  {cities.map((item, index: number) => (
                    <MenuItem key={index} value={`${item}`.toLowerCase()}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{touched.city && errors.city}</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>

          <br />

          <Box width={"100%"}>
            <TextField
              variant="outlined"
              type="text"
              fullWidth
              required
              label="Street Address"
              size="small"
              {...getFieldProps("street")}
              error={Boolean(touched.street && errors.street)}
              helperText={touched.street && errors.street}
            />
          </Box>
          <br />

          <RoundedButton
            variant="contained"
            type="submit"
            sx={{ bgcolor: theme.palette.primary.main, color: "white" }}
          >
            Update Profile
          </RoundedButton>
        </Box>
      </Form>
    </FormikProvider>
  );
}
