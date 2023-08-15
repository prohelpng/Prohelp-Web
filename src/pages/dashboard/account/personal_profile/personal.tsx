import * as React from "react";
import {
  Box,
  FormControl,
  NativeSelect,
  TextField,
  Typography,
} from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import PhoneInput from "react-phone-input-2";
import { useAppSelector } from "../../../../utils/hooks/apphook";

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
}

export default function Personal() {
  const profile = useAppSelector((state) => state.auth.profile);

  const initialState: InitialState = {
    firstname: "",
    middlename: "",
    lastname: "",
    email: profile?.email,
    phone: "",
    gender: "",
    age: "",
    street: "",
    city: "",
    state: "",
  };

  React.useEffect(() => {
    initialState.email = profile?.email ?? "";
    initialState.firstname = profile?.bio?.firstname ?? "";
    initialState.lastname = profile?.bio?.lastname ?? "";
    initialState.middlename = profile?.bio?.middlename ?? "";
    initialState.gender = profile?.bio?.gender ?? "";
    initialState.age = profile?.bio?.dob ?? "";
    initialState.street = profile?.address?.street ?? "";
    initialState.state = profile?.address?.state ?? "";
    initialState.city = profile?.address?.city ?? "";
  }, []);

  const formik = useFormik({
    initialValues: initialState,
    onSubmit: async () => {},
  });

  const { handleSubmit, getFieldProps, values, errors, touched } = formik;

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
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography>First Name *</Typography>
            <TextField
              required
              id="standard-basic"
              variant="standard"
              type="text"
              fullWidth
              size="small"
              sx={{ maxWidth: "80%" }}
              {...getFieldProps("firstname")}
              error={Boolean(touched.firstname && errors.firstname)}
              helperText={touched.firstname && errors.firstname}
            />
          </Box>

          <br />

          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography>Middle Name</Typography>
            <TextField
              id="standard-basic"
              variant="standard"
              type="text"
              fullWidth
              size="small"
              sx={{ maxWidth: "80%" }}
              {...getFieldProps("middlename")}
              error={Boolean(touched.middlename && errors.middlename)}
              helperText={touched.middlename && errors.middlename}
            />
          </Box>

          <br />

          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography>Last Name*</Typography>
            <TextField
              id="standard-basic"
              variant="standard"
              type="text"
              fullWidth
              size="small"
              sx={{ maxWidth: "80%" }}
              {...getFieldProps("lastname")}
              error={Boolean(touched.lastname && errors.lastname)}
              helperText={touched.lastname && errors.lastname}
            />
          </Box>

          <br />

          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography>Email Address*</Typography>
            <TextField
              id="standard-basic"
              variant="standard"
              type="email"
              fullWidth
              disabled
              size="small"
              sx={{ maxWidth: "80%" }}
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
          </Box>

          <br />

          <Box
            width={"100%"}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography flex={1}>Phone Number*</Typography>
            <PhoneInput
              country={"ng"}
              value={values.phone}
              onChange={(phone) => {}}
              placeholder="Enter phone number"
              inputProps={{
                required: true,
                size: "small",
                //   error: Boolean(touched.lastname && errors.lastname)}
                // helperText: {touched.lastname && errors.lastname}
              }}
              inputStyle={{ width: "100%", border: "none" }}
              defaultErrorMessage="Phone number is required"
              specialLabel=""
            />
          </Box>
          <br />

          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography>Gender*</Typography>
            <FormControl fullWidth sx={{ maxWidth: "80%" }}>
              <NativeSelect id="gender">
                {["Male", "Female"].map((gender, index: number) => (
                  <option key={index} value={`${gender}`.toLowerCase()}>
                    {gender}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
          </Box>

          <br />

          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography>Age*</Typography>
            <TextField
              id="standard-basic"
              variant="standard"
              type="date"
              fullWidth
              size="small"
              sx={{ maxWidth: "80%" }}
              {...getFieldProps("age")}
              error={Boolean(touched.age && errors.age)}
              helperText={touched.age && errors.age}
            />
          </Box>
          <br />
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography>Street*</Typography>
            <TextField
              id="standard-basic"
              variant="standard"
              type="text"
              fullWidth
              size="small"
              sx={{ maxWidth: "80%" }}
              {...getFieldProps("street")}
              error={Boolean(touched.street && errors.street)}
              helperText={touched.street && errors.street}
            />
          </Box>
          <br />
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography>City*</Typography>
            <TextField
              id="standard-basic"
              variant="standard"
              type="text"
              fullWidth
              size="small"
              sx={{ maxWidth: "80%" }}
              {...getFieldProps("city")}
              error={Boolean(touched.city && errors.city)}
              helperText={touched.city && errors.city}
            />
          </Box>
          <br />
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography>State*</Typography>
            <TextField
              id="standard-basic"
              variant="standard"
              type="text"
              fullWidth
              size="small"
              sx={{ maxWidth: "80%" }}
              {...getFieldProps("state")}
              error={Boolean(touched.state && errors.state)}
              helperText={touched.state && errors.state}
            />
          </Box>
        </Box>
      </Form>
    </FormikProvider>
  );
}
