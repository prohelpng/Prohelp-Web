import * as React from "react";
import { Container } from "@mui/material";

export interface ContainerChildren {
  children: React.ReactNode;
}

// const MContainer = styled(Container)<CustomButtonProps>(({ theme }) => ({
//   width: "90%",
//   disableGutters: true
// }));

export default function CustomContainer(children: ContainerChildren): any {
  return <Container disableGutters {...children}></Container>;
}
