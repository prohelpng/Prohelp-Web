import * as React from "react";
import {
  Box,
  Card,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/apphook";
import CustomizedDialog from "../dialog";
import LoginDialogContent from "../../pages/auth/login_dialog_content";

interface Props {
  height: number;
}

interface CustomButtonProps {
  children: React.ReactNode;
}

const HoverCard = styled(Card)<CustomButtonProps>(({ theme }) => ({
  background: "white",
  borderRadius: "4px",
  cursor: "pointer",
  "&:hover": {
    background: "#0066f51d",
    color: "black",
  },
}));

export default function CardButton(props: Props) {
  let { height } = props;
  const theme = useTheme();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [deviceType, setDeviceType] = React.useState("mobile");
  //   const [isLiked, setLiked] = React.useState(false);

  //   const dispatch = useAppDispatch();
  let profile = useAppSelector((state) => state.auth.profile);
  let isAuth = useAppSelector((state) => state.auth.isAuth);

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
  }, [mobile, tablet]);

  return (
    <HoverCard
      elevation={0.75}
      sx={{
        my: 2,
        height: height,
        borderRadius: 4,
        border: "0.4px solid",
        bgcolor: theme.palette.primary.light,
      }}
    >
      <CustomizedDialog
        open={openDialog}
        setOpen={setOpenDialog}
        title="Login to continue"
        body={<LoginDialogContent open={openDialog} setOpen={setOpenDialog} />}
      />
      <Box
        p={2}
        height={height}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        position={"relative"}
        onClick={() => setOpenDialog(true)}
      >
        <Box
          width={height / 2}
          height={height / 2}
          display={"flex"}
          borderRadius={height / 4}
          bgcolor={"white"}
          alignItems={"center"}
          flexDirection={"column"}
          justifyContent={"center"}
        >
          <Box
            width={"90%"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography
              color={theme.palette.primary.main}
              textAlign={"center"}
              fontSize={24}
              fontWeight={700}
            >
              Sign in to see more
            </Typography>
          </Box>
        </Box>
      </Box>
    </HoverCard>
  );
}
