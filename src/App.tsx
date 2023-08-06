import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import RootPage from "./pages/";
import Footer from "./layouts/footers/";
import MainNavbar, {
  Props as AppBarProps,
} from "./layouts/navbars/main_navbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileNavbar, {
  MobileAuthNavbar,
} from "./layouts/navbars/mobile_navbar";
import JoinNow from "./pages/auth/join";
import Signup from "./pages/auth/signup";
import { Backdrop, CircularProgress } from "@mui/material";

import { useAppSelector, useAppDispatch } from "./utils/hooks/apphook";
import Login from "./pages/auth/login";
import VerifyOTP from "./pages/auth/verify_otp";
import { Toaster } from "react-hot-toast";
import DashbboardLayout from "./layouts/dashboard/dashboard_layout";
import Explore from "./pages/dashboard/explore";
import Jobs from "./pages/dashboard/jobs";
import ChatPage from "./pages/dashboard/chat";
import Support from "./pages/dashboard/support";
import useProfile from "./utils/hooks/use_profile";
import { setAuth, setProfile } from "./redux/reducers/auth";
import useProfessionals from "./utils/hooks/use_professinals";
import { setProfessionals } from "./redux/reducers/users";
import useJobs from "./utils/hooks/useJobs";
import { setJobs } from "./redux/reducers/jobs";

function App() {
  const [deviceType, setDeviceType] = React.useState("mobile");
  const [hidden, setHidden] = React.useState("");
  const [showMobileAuthFooter, setShowMobileAuthFooter] = React.useState(false);
  const location = useLocation();

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only("xs"));
  const tablet = useMediaQuery(theme.breakpoints.only("sm"));

  const loading = useAppSelector((state) => state.loader.isLoading);
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector((state) => state.auth.isAuth);
  const { data } = useProfile();
  const { data: jobData } = useJobs();
  const { data: proData } = useProfessionals();

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
    if (
      location.pathname.includes("/signup") ||
      location.pathname.includes("/login") ||
      location.pathname.includes("/verify-otp") ||
      location.pathname.includes("/dashboard")
    ) {
      setHidden("hide");
      setShowMobileAuthFooter(false);
    } else {
      setHidden("show");
      setShowMobileAuthFooter(false);
    }

    if (location.pathname.includes("/dashboard") && deviceType !== "pc") {
      setShowMobileAuthFooter(true);
    }
  }, [location]);

  const childrenElement: JSX.Element = <Box bgcolor={"red"}></Box>;

  // Define the props object to be passed to ElevateAppBar
  const appBarProps: AppBarProps = {
    children: childrenElement,
  };

  React.useEffect(() => {
    if (data) {
      dispatch(setAuth(true));
      dispatch(setProfile(data?.data));
    }
    if (proData) {
      dispatch(setProfessionals(proData?.data));
    }
    if (jobData) {
      dispatch(setJobs(jobData?.docs));
    }
  }, [data, dispatch, jobData, proData]);

  return (
    <div className="App">
      <Toaster />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {hidden === "show" ? (
        <>
          <MainNavbar {...appBarProps} />
          {deviceType !== "pc" ? <MobileNavbar /> : <div />}
        </>
      ) : (
        <>
          {showMobileAuthFooter && deviceType !== "pc" && <MobileAuthNavbar />}
        </>
      )}

      <Routes>
        <Route path="/" element={<RootPage />} />
        <Route path="/signup" element={<JoinNow />} />
        <Route path="/signup/recruiter" element={<Signup />} />
        <Route path="/signup/professional" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        {isAuthenticated && (
          <Route path="/dashboard" element={<DashbboardLayout />}>
            <Route
              path="/dashboard"
              element={<Navigate to="/dashboard/explore" replace />}
            />
            <Route path="/dashboard/explore" element={<Explore />} />
            <Route path="/dashboard/jobs" element={<Jobs />} />
            <Route path="/dashboard/message" element={<ChatPage />} />
            <Route path="/dashboard/support" element={<Support />} />
          </Route>
        )}
      </Routes>
      {hidden === "show" ? <Footer /> : <></>}
    </div>
  );
}

export default App;
