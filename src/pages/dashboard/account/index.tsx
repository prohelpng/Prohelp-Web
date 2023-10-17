import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Divider,
  ListItemButton,
  useMediaQuery,
} from "@mui/material";
import theme from "../../../assets/theme/Theme";
import { ArrowForward } from "@mui/icons-material";
import PersonalProfile from "./personal_profile";
import personIcon from "../../../assets/images/person_icon.svg";
import securityIcon from "../../../assets/images/pass_icon.svg";
import supportIcon from "../../../assets/images/support_phone.svg";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import MyProfile from "../../user/myprofile";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: "100%" }}
    >
      {value === index && <Box sx={{ p: 3, width: "100%" }}>{children}</Box>}
    </div>
  );
}

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    orientation="vertical"
    variant="scrollable"
    style={{ width: "18%" }}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 0,
    width: "100%",
    backgroundColor: "#635ee7",
  },
});

interface StyledTabProps {
  label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "none",
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: 16,
  marginRight: theme.spacing(1),
  fontFamily: "Inter",
  paddingLeft: 24,
  paddingRight: 24,
  backgroundColor: "white",
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  height: 16,
  color: "grey",
  "&.Mui-selected": {
    color: "#000",
    fontWeight: theme.typography.fontWeightBold,
    backgroundColor: theme.palette.primary.light,
    fontFamily: "Inter",
    borderRadius: 10,
    paddingLeft: 16,
    paddingRight: 16,
  },
  "&.Mui-focusVisible": {
    backgroundColor: "gray",
  },
}));

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function Account() {
  const [value, setValue] = React.useState(0);

  // const profile = useAppSelector((state) => state.auth.profile);

  const [deviceType, setDeviceType] = React.useState("mobile");

  // const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const mobileRoutes = [
    {
      title: "Personal information",
      icon: personIcon,
    },
    {
      title: "Security",
      icon: securityIcon,
    },
    {
      title: "Contact support",
      icon: supportIcon,
    },
    {
      title: "My Wallet",
      icon: supportIcon,
    },
  ];

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"start"}
      alignItems={"start"}
      width={"100%"}
    >
      <Divider />
      {deviceType === "pc" ? (
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            height: "100%",
            width: "100%",
          }}
        >
          <StyledTabs
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ py: 2, position: "fixed", width: "16%" }}
          >
            <StyledTab label="My Account" {...a11yProps(0)} />
            <StyledTab label="My Profile" {...a11yProps(1)} />
            <StyledTab label="Security" {...a11yProps(2)} />
            <StyledTab label="My Wallet " {...a11yProps(3)} />
          </StyledTabs>
          <Box ml={"22%"} width={"100%"}>
            <TabPanel value={value} index={0}>
              <PersonalProfile />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <MyProfile />
            </TabPanel>
            <TabPanel value={value} index={2}>
              Item Three
            </TabPanel>
            <TabPanel value={value} index={3}>
              Item Four
            </TabPanel>
          </Box>
        </Box>
      ) : (
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"start"}
          alignItems={"stretch"}
          width={"100%"}
          py={4}
        >
          {mobileRoutes?.map((item: any, index: number) => (
            <ListItemButton
              key={index}
              sx={{
                border: "1px solid",
                borderRadius: 2,
                my: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onClick={() => navigate("/dashboard/account/profile")}
            >
              <Box
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"start"}
                alignItems={"center"}
                py={1}
              >
                <img src={item?.icon} alt="" />
                <Typography px={2}>{item?.title}</Typography>
              </Box>
              <ArrowForward fontSize="small" />
            </ListItemButton>
          ))}
        </Box>
      )}
    </Box>
  );
}
