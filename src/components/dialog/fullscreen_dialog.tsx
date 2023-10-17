import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { AppBar, Toolbar } from "@mui/material";
import { CustomDialogProps, BootstrapDialogTitle } from ".";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function FullScreenDialog({
  body,
  open,
  setOpen,
  title,
}: CustomDialogProps) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar elevation={0} >
          <Toolbar>
            <BootstrapDialogTitle
              id="customized-dialog-title"
              onClose={handleClose}
            >
              {title}
            </BootstrapDialogTitle>
          </Toolbar>
        </AppBar>
        <Toolbar />
        {body}
      </Dialog>
    </div>
  );
}
