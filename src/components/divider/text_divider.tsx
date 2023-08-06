import * as React from "react";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

interface Props {
  label: string;
}

export default function DividerText() {
  return (
    <Root>
      <Divider>
        <Chip label="Or" />
      </Divider>
    </Root>
  );
}

export function DividerLongText(props: Props) {
  let { label } = props;
  return (
    <Root>
      <Divider>{label}</Divider>
    </Root>
  );
}
