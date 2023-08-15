import { Box, Typography } from "@mui/material";
import RoundedButton from "../../components/button/round_button";
import theme from "../../assets/theme/Theme";
import { Visibility } from "@mui/icons-material";
// import { useAppSelector } from "../../utils/hooks/apphook";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import FactCheckIcon from "@mui/icons-material/FactCheck";

interface Props {
  deviceType: any;
}

export default function ActionRow(props: Props) {
  const { deviceType } = props;

  // const isAuth = useAppSelector((state) => state.auth.isAuth);

  return (
    <Box
      width={"100%"}
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      height={deviceType === "mobile" ? 38 : 42}
    >
      <RoundedButton
        variant="contained"
        sx={{ bgcolor: theme.palette.primary.main, color: "white" }}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Visibility
            fontSize="small"
            sx={{ mx: 1, display: { xs: "none", sm: "none", md: "block" } }}
          />
          <Typography
            fontSize={deviceType === "mobile" ? "0.9rem" : "1.0rem"}
          >{`${
            deviceType === "mobile" ? "Contact" : "Contact info"
          }`}</Typography>
        </Box>
      </RoundedButton>
      <RoundedButton
        variant="contained"
        sx={{ bgcolor: theme.palette.secondary.main, mx: 1, color: "white" }}
      >
        {
          <Diversity1Icon
            fontSize="small"
            sx={{ mx: 1, display: { xs: "none", sm: "none", md: "block" } }}
          />
        }
        <Typography
          fontSize={deviceType === "mobile" ? "0.9rem" : "1.0rem"}
        >{`Connections`}</Typography>
      </RoundedButton>
      <RoundedButton
        variant="contained"
        sx={{ bgcolor: theme.palette.info.main, color: "white" }}
      >
        {
          <FactCheckIcon
            fontSize="small"
            sx={{ mx: 1, display: { xs: "none", sm: "none", md: "block" } }}
          />
        }
        <Typography
          fontSize={deviceType === "mobile" ? "0.9rem" : "1.0rem"}
        >{`${
          deviceType === "mobile" ? "Verified" : "Verified Doc"
        }`}</Typography>
      </RoundedButton>
    </Box>
  );
}
