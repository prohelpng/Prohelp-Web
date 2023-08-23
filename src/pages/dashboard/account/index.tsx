import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks/apphook";
import {
  AppBar,
  Avatar,
  Divider,
  IconButton,
  ListItemButton,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import theme from "../../../assets/theme/Theme";
import { ArrowForward, ArrowForwardIos, Person, PhonelinkLockOutlined, Security } from "@mui/icons-material";
import PersonalProfile from "./personal_profile";
import personIcon from "../../../assets/images/person_icon.svg";
import securityIcon from "../../../assets/images/pass_icon.svg";
import supportIcon from "../../../assets/images/support_phone.svg";
import { useNavigate } from "react-router-dom";

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

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function Account() {
  const [value, setValue] = React.useState(0);

  const profile = useAppSelector((state) => state.auth.profile);

  const [deviceType, setDeviceType] = React.useState("mobile");

  const dispatch = useAppDispatch();
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
      <Box
        width={"100%"}
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Tooltip title="Open settings" sx={{ mb: 2 }}>
            <IconButton sx={{ p: 0 }}>
              <Avatar
                sx={{
                  width:
                    deviceType === "mobile"
                      ? 80
                      : deviceType === "tablet"
                      ? 100
                      : 128,
                  height:
                    deviceType === "mobile"
                      ? 80
                      : deviceType === "tablet"
                      ? 100
                      : 128,
                  borderRadius:
                    deviceType === "mobile"
                      ? 40
                      : deviceType === "tablet"
                      ? 50
                      : 64,
                  border: "1px solid #0066F5",
                }}
                alt="Remy Sharp"
                src="https://pbs.twimg.com/profile_images/864104988146114560/MSWTWwno_400x400.jpg"
              />
            </IconButton>
          </Tooltip>
          <Typography
            pt={1}
            textTransform={"capitalize"}
            fontSize={"1.2rem"}
            fontWeight={600}
          >
            {`${profile?.bio?.firstname} ${profile?.bio?.middlename} ${profile?.bio?.lastname}`}
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            fontWeight={500}
            textTransform={"uppercase"}
            color={theme.palette.primary.main}
          >{`${profile?.accountType}`}</Typography>
        </Box>
      </Box>
      <Divider />
      {deviceType === "pc" ? (
        <Box
          px={2}
          sx={{
            flexGrow: 1,
            display: "flex",
            height: "100%",
            width: "100%",
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            style={{ marginRight: 10 }}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab
              icon={<Person />}
              iconPosition="start"
              label=" Profile"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Security />}
              iconPosition="start"
              label="Security"
              {...a11yProps(1)}
            />
            <Tab label="My Wallet " {...a11yProps(2)} />
            <Tab label="Item Four" {...a11yProps(3)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <PersonalProfile />
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
          <TabPanel value={value} index={3}>
            Item Four
          </TabPanel>
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
