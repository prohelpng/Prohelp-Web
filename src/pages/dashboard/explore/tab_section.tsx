import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
// import SwipeableViews from "react-swipeable-views";
import { AppBar, List, Typography, useMediaQuery } from "@mui/material";
import { useAppSelector } from "../../../utils/hooks/apphook";
import ProCard from "../../../components/professional/pro_card";
import ProfessionalCardLoader from "../../../components/skeleton/pro_card_loader";

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
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
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  color: "black",
  "&.Mui-selected": {
    color: theme.palette.primary.main,
  },
  "&.Mui-focusVisible": {
    backgroundColor: "rgba(100, 95, 228, 0.32)",
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function TabSection() {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const profile = useAppSelector((state) => state.auth.profile);
  const professionals = useAppSelector((state) => state.users.professionals);

  const [deviceType, setDeviceType] = React.useState("mobile");

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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  console.log("PROS", professionals);

  return deviceType !== "pc" ? (
    <Box sx={{ bgcolor: "background.paper", width: deviceType ==="mobile" ? "88vw" : "94vw" }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab
            sx={{ fontSize: 16, textTransform: "capitalize" }}
            label="Professionals"
            {...a11yProps(0)}
          />
          <Tab
            sx={{ fontSize: 16, textTransform: "capitalize" }}
            label="Saved"
            {...a11yProps(1)}
          />
          <Tab
            sx={{ fontSize: 16, textTransform: "capitalize" }}
            label="Connections"
            {...a11yProps(2)}
          />
        </Tabs>
      </AppBar>
      <Box
        textTransform={"capitalize"}
        fontSize={16}
        // axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        // index={value}
        // onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <List>
            {professionals
              ? professionals?.map((item: any) => (
                  // <p>{item?.bio?.firstname}</p>
                  <ProCard data={item} />
                ))
              : [1, 2, 3]?.map((item) => <ProfessionalCardLoader />)}
          </List>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Item Three
        </TabPanel>
      </Box>
    </Box>
  ) : (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{ bgcolor: "#fff", border: "1px solid", color: "black" }}
        borderRadius={4}
      >
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example"
        >
          <StyledTab label={"Professionals"} />
          <StyledTab label="Saved" />
          <StyledTab label="Connections" />
        </StyledTabs>
        <Box>
          <TabPanel value={value} index={0} dir={theme.direction}>
            <List>
              {professionals
                ? professionals?.map((item: any) => (
                    // <p>{item?.bio?.firstname}</p>
                    <ProCard data={item} />
                  ))
                : [1, 2, 3]?.map((item) => <ProfessionalCardLoader />)}
            </List>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            Item Three
          </TabPanel>
        </Box>
        <Box sx={{ p: 3 }} />
      </Box>
    </Box>
  );
}
