import * as React from "react";
import TextField from "@mui/material/TextField";


interface Props {
    value: any;
    name: string,
    placeholder: string;
    label: React.ReactNode;
    onChange: React.ChangeEventHandler
  }

export default function CustomTextField(props: Props) {
    let { value, placeholder, label, onChange, name} = props;

  return (
    <TextField
      fullWidth
      variant="outlined"
      size="small"
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      sx={{ border: "none", borderRadius: 32 }}
      InputProps={{
        disableUnderline: true,
        style: {
          color: "black",
        },
      }}
    />
  );
}
