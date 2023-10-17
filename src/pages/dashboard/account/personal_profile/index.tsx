import * as React from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import theme from "../../../../assets/theme/Theme";
import Personal from "./personal";
import { useAppSelector } from "../../../../utils/hooks/apphook";
import { Avatar, IconButton, Typography, useMediaQuery } from "@mui/material";
import { CameraAlt } from "@mui/icons-material";

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

// function a11yProps(index: number) {
//   return {
//     id: `vertical-tab-${index}`,
//     "aria-controls": `vertical-tabpanel-${index}`,
//   };
// }

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
  color: "rgba(0, 0, 0, 0.7)",
  "&.Mui-selected": {
    color: theme.palette.primary.main,
  },
  "&.Mui-focusVisible": {
    backgroundColor: "rgba(100, 95, 228, 0.32)",
  },
}));

export interface PersonalProfileProps {
  selectedFile: any;
}

export default function PersonalProfile() {
  const [value, setValue] = React.useState(0);
  const profile = useAppSelector((state) => state.auth.profile);

  const [deviceType, setDeviceType] = React.useState("mobile");

  const pickerRef = React.useRef<any>();
  const [mfile, setMFile] = React.useState<any>(null);
  const [previewImage, setPreviewImage] = React.useState(profile?.bio?.image);

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

  const handleFileInputChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      try {
        if (event.target?.files[0]) {
          setMFile(file);
          setPreviewImage(URL.createObjectURL(file));
        } else {
          setPreviewImage("");
        }
      } catch (e) {}
    } else {
      setMFile(null);
    }
  };

  const renderAvatar = (
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
        <IconButton
          sx={{ p: 0, position: "relative" }}
          onClick={() => {
            pickerRef.current.click();
          }}
        >
          <Box
            position={"absolute"}
            bottom={1}
            zIndex={10}
            width={86}
            height={35}
            display="flex"
            flexDirection={"column"}
            justifyContent={"end"}
            alignItems={"center"}
            sx={{
              width:
                deviceType === "mobile"
                  ? 78
                  : deviceType === "tablet"
                  ? 98
                  : 126,
              height:
                deviceType === "mobile"
                  ? 78
                  : deviceType === "tablet"
                  ? 98
                  : 126,
              borderRadius:
                deviceType === "mobile"
                  ? 39
                  : deviceType === "tablet"
                  ? 49
                  : 63,
              backgroundImage: "linear-gradient(transparent, #ccc)",
            }}
          >
            <CameraAlt fontSize="medium" sx={{ color: "white", mb: 2 }} />
          </Box>
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
            src={previewImage}
          />
        </IconButton>
        <input
          ref={pickerRef}
          id="image"
          name="image"
          type="file"
          style={{ display: "none" }}
          // value={image}
          onChange={handleFileInputChange}
          placeholder="Image banner"
        />

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
  );

  return (
    <Box sx={{ width: "100%" }}>
      {profile?.accountType === "recruiter" ? (
        <>
          {renderAvatar}
          <Personal selectedFile={mfile} />
        </>
      ) : (
        <>
          {renderAvatar}
          <Box sx={{ bgcolor: theme.palette.secondary.light, color: "black" }}>
            <StyledTabs
              value={value}
              onChange={handleChange}
              aria-label="styled tabs example"
            >
              <StyledTab label="Bio" />
              <StyledTab label="Guarantor" />
            </StyledTabs>
            <Box sx={{ p: 3 }} />
          </Box>

          <Box>
            <TabPanel value={value} index={0}>
              <Personal selectedFile={mfile} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
          </Box>
        </>
      )}
    </Box>
  );
}
