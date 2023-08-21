import { Box, Grid, TextField, useMediaQuery } from "@mui/material";
import { FormikProvider, Form, useFormik } from "formik";
import RoundedButton from "../button/round_button";
import theme from "../../assets/theme/Theme";
import React from "react";

export default function ContactForm() {
  let initialValues = {
    subject: "",
    message: "",
    email: "",
    phone: "",
    fullname: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: () => {},
  });

  let { handleSubmit, errors, touched, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form noValidate onSubmit={handleSubmit}>
        <Box py={1}>
          <TextField
            fullWidth
            variant="outlined"
            label="Full Name"
            required={true}
            {...getFieldProps("fullname")}
            error={Boolean(touched.fullname && errors.fullname)}
            helperText={touched.fullname && errors.fullname}
            placeholder="Enter your name"
          />
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <Box py={1}>
              <TextField
                fullWidth
                type="email"
                variant="outlined"
                label="Email Address"
                required={true}
                {...getFieldProps("email")}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                placeholder="Enter your email"
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <Box py={1}>
              <TextField
                fullWidth
                type="number"
                variant="outlined"
                label="Phone Number"
                required={true}
                {...getFieldProps("phone")}
                error={Boolean(touched.phone && errors.phone)}
                helperText={touched.phone && errors.phone}
                placeholder="Enter your phone number"
              />
            </Box>
          </Grid>
        </Grid>

        <Box py={1}>
          <TextField
            fullWidth
            variant="outlined"
            label="Subject"
            required={true}
            {...getFieldProps("subject")}
            error={Boolean(touched.subject && errors.subject)}
            helperText={touched.subject && errors.subject}
            placeholder="Enter subject"
          />
        </Box>

        <Box py={1}>
          <TextField
            fullWidth
            variant="outlined"
            label="Message"
            multiline
            minRows={5}
            required={true}
            {...getFieldProps("message")}
            error={Boolean(touched.message && errors.message)}
            helperText={touched.message && errors.message}
            placeholder="Type your message here"
          />
        </Box>

        <RoundedButton
          sx={{ mt: 2, bgcolor: theme.palette.primary.main, color: "white" }}
          type="submit"
          fullWidth={true}
          variant="contained"
        >
          Submit
        </RoundedButton>
      </Form>
    </FormikProvider>
  );
}
