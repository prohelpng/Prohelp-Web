import * as React from "react";
import { Favorite, FavoriteOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  IconButton,
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

  React.useEffect(() => {
    const checkLiked = () => {};
  }, []);

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
    <HoverCard sx={{ my: 2, height: height }}>
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
        alignItems={"stretch"}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"start"}
        >
          <Box
            width={"100%"}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"start"}
            alignItems={"start"}
          >
            <Avatar
              alt="Remy Sharp"
              sx={{
                width: deviceType === "pc" ? 70 : 48,
                height: deviceType === "pc" ? 70 : 48,
              }}
              src={data?.bio?.image}
            />
            <Box
              mr={deviceType === "pc" ? 4 : deviceType === "tablet" ? 2 : 1}
            />
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"start"}
              alignItems={"start"}
            >
              <Typography
                lineHeight={1.12}
                variant="body1"
                fontWeight={600}
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
          <Box>
            <IconButton
              onClick={() => {
                if (isAuth) {
                  like();
                } else {
                  setOpenDialog(true);
                }
              }}
            >
              {isLiked ? (
                <Favorite sx={{ color: "red" }} />
              ) : (
                <FavoriteOutlined />
              )}
            </IconButton>
          </Box>
        </Box>
        {/* <Box p={deviceType === "pc" ? 2 : deviceType === "tablet" ? 1 : 0.5} /> */}

        <Box
          flex={1}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"stretch"}
          alignItems={"start"}
          mt={deviceType === "pc" ? 2 : deviceType === "tablet" ? 1 : 0.5}
        >
          <Typography gutterBottom variant="body2">
            {`${data?.bio?.about}`?.substring(
              0,
              deviceType === "pc" ? 186 : deviceType === "tablet" ? 150 : 100
            )}
          </Typography>
          <Box display={"flex"} flexDirection={"row"}>
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
                navigate("/dashboard/professionals/" + data?.id, {
                  state: { user: data },
                });
              } else {
                navigate("/professionals/" + data?.id, {
                  state: { user: data },
                });
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
