import * as React from "react";
// import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { AppBar, Box, Toolbar, useTheme } from "@mui/material";

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export interface CustomDialogProps {
  setOpen: any;
  open: boolean;
  body: any;
  title: string;
}

export function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon sx={{ color: "white" }} />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function CustomizedDialog(props: CustomDialogProps) {
  const { open, setOpen, body, title } = props;

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        keepMounted
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {title}
        </BootstrapDialogTitle>
        {body}
      </Dialog>
    </div>
  );
}

export function BrandedDialog(props: CustomDialogProps) {
  const { open, setOpen, body, title } = props;
  const theme = useTheme()

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog onClose={handleClose} open={open} keepMounted fullScreen={false}>
      <Box borderRadius={10} width={'100%'} minWidth={320} >
        <Box bgcolor={theme.palette.primary.main} color={'white'} >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            {title}
          </BootstrapDialogTitle>
        </Box>
        {body}
      </Box>
    </Dialog>
  );
}
