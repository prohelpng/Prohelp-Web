import * as React from "react";
import { Favorite, FavoriteOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  IconButton,
  Rating,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import RoundedButton from "../button/round_button";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/apphook";
import { setLoading } from "../../redux/reducers/loader";
import APIService from "../../service";
import { toast } from "react-hot-toast";
import CustomizedDialog from "../dialog";
import LoginDialogContent from "../../pages/auth/login_dialog_content";

interface Props {
  data: any;
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

export default function ProCard(props: Props) {
  let { data, height } = props;
  const theme = useTheme();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [isLiked, setLiked] = React.useState(false);
  const [deviceType, setDeviceType] = React.useState("mobile");

  const dispatch = useAppDispatch();
  let profile = useAppSelector((state) => state.auth.profile);
  let isAuth = useAppSelector((state) => state.auth.isAuth);

  const navigate = useNavigate();
  const location = useLocation();

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

  // React.useEffect(() => {
  //   const checkLiked = () => {};
  // }, []);

  const like = async () => {
    try {
      const email = localStorage.getItem("auth-email");
      // guestId, guestName, userId
      dispatch(setLoading(true));
      let response = await APIService.update("/likeUser", email, {
        guestId: data?.id,
        userId: profile?.id,
        guestName: data?.bio?.firstname + " " + data?.bio?.lastname,
      });
      toast.success(response?.data?.message);
      console.log("DATA RES", response);
      dispatch(setLoading(false));
      setLiked(!like);
    } catch (error: any) {
      dispatch(setLoading(false));
      console.log("ERRO", error);
      toast.error(error?.message ?? "Check your internet connection");
    }
  };

  return (
    <HoverCard
      elevation={0.75}
      sx={{ my: 2, height: height, borderRadius: 4, border: "0.4px solid" }}
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
        justifyContent={"start"}
        alignItems={"center"}
        position={"relative"}
      >
        <IconButton
          onClick={() => {
            if (isAuth) {
              like();
            } else {
              setOpenDialog(true);
            }
          }}
          sx={{ right: 6, top: 4, position: "absolute" }}
        >
          {isLiked ? <Favorite sx={{ color: "red" }} /> : <FavoriteOutlined />}
        </IconButton>
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"start"}
        >
          <Box
            width={"100%"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"start"}
            alignItems={"center"}
          >
            <Avatar
              alt="Remy Sharp"
              sx={{
                width: deviceType === "pc" ? 128 : 48,
                height: deviceType === "pc" ? 128 : 48,
              }}
              src={data?.bio?.image}
            />
            <Box
              mr={deviceType === "pc" ? 4 : deviceType === "tablet" ? 2 : 1}
            />
            <Box
              py={1}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"start"}
              alignItems={"center"}
              textAlign={"center"}
            >
              <Typography
                lineHeight={1.12}
                variant={deviceType === "pc" ? "h6" : "body1"}
                fontWeight={700}
                textTransform={"capitalize"}
                color={theme.palette.primary.main}
              >
                {`${data?.bio?.firstname} ${data?.bio?.middlename} ${data?.bio?.lastname}`}
              </Typography>
              <Typography
                variant="body2"
                fontWeight={600}
                textTransform={"capitalize"}
              >
                {`${data?.profession}`}
              </Typography>
              <Typography variant="body2" textTransform={"capitalize"}>
                {`${data?.address?.city}, ${data?.address?.country}`}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          flex={1}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"stretch"}
          alignItems={"start"}
          // mt={deviceType === "pc" ? 1 : deviceType === "tablet" ? 1 : 0.5}
        >
          <Rating name="read-only" value={data?.rating ?? 1} readOnly />
          <Box mt={1} display={"flex"} flexDirection={"row"}>
            {data?.skills?.map((val: any) => (
              <Chip
                sx={{ mr: 1, textTransform: "capitalize" }}
                label={val?.name}
              />
            ))}
          </Box>
        </Box>

        <Box
          mt={2}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"start"}
          alignItems={"center"}
        >
          <Button
            variant="outlined"
            sx={{
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              padding: "12px",
              width: 120,
              height: 40,
              borderRadius: "32px",
              textTransform: "capitalize",
              "&:hover": {
                background: "#131022",
                color: "white",
                border: "none",
              },
            }}
            onClick={() => {
              if (isAuth && location.pathname.startsWith("/dashboard")) {
                navigate("/professionals/" + data?.id, {
                  state: { user: data },
                });
                // navigate("/dashboard/professionals/" + data?.id, {
                //   state: { user: data },
                // });
              } else {
                //Prompt to login
                setOpenDialog(true);
                // navigate("/professionals/" + data?.id, {
                //   state: { user: data },
                // });
              }
            }}
          >
            See more
          </Button>
          <RoundedButton
            sx={{
              bgcolor: theme.palette.primary.main,
              color: "white",
              width: 120,
              height: 40,
              ml: 2,
            }}
            onClick={() => {
              if (!isAuth) {
                //Prompt to login
                setOpenDialog(true);
              }
            }}
          >
            Connect
          </RoundedButton>
        </Box>
      </Box>
    </HoverCard>
  );
}
