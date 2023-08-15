import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "../store";

// Define a type for the slice state
interface UserState {
  professionals: any;
  recruiters: any;
  savedPros: any;
}

// Define the initial state using that type
const initialState: UserState = {
  professionals: [],
  recruiters: [],
  savedPros: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setProfessionals: (state, action: PayloadAction<any>) => {
      state.professionals = action.payload;
    },
    setRecruiters: (state, action: PayloadAction<any>) => {
      state.recruiters = action.payload;
    },
    setSavedPro: (state, action: PayloadAction<any>) => {
      state.savedPros = action.payload;
    },
  },
});

export const { setProfessionals, setRecruiters, setSavedPro } = usersSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
// export const getAuth = (state: RootState) => state.auth.isAuth;
// export const getProfile = (state: RootState) => state.auth.profile;

export default usersSlice.reducer;
