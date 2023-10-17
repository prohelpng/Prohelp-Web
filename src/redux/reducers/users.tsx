import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "../store";

// Define a type for the slice state
interface UserState {
  professionals: any;
  recruiters: any;
  savedPros: any;
  filterLocation: string;
  prosByCategory: any;
  filterAge: string | null;
  filterMaritalStatus: string | null;
  filterSkills: string[];
}

// Define the initial state using that type
const initialState: UserState = {
  professionals: [],
  recruiters: [],
  savedPros: [],
  prosByCategory: {},
  filterAge: null,
  filterSkills: [],
  filterMaritalStatus: null,
  filterLocation: "All of Nigeria",
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
    setFilterLocation: (state, action: PayloadAction<string>) => {
      state.filterLocation = action.payload;
    },
    setProsByCategory: (state, action: PayloadAction<string>) => {
      state.prosByCategory = action.payload;
    },
    setFilterAge: (state, action: PayloadAction<string | null>) => {
      state.filterAge = action.payload;
    },
    setFilterSkills: (state, action: PayloadAction<string[]>) => {
      state.filterSkills = action.payload;
    },
    setFilterMaritalStatus: (state, action: PayloadAction<string | null>) => {
      state.filterMaritalStatus = action.payload;
    },
  },
});

export const {
  setProfessionals,
  setRecruiters,
  setSavedPro,
  setFilterLocation,
  setProsByCategory,
  setFilterAge,
  setFilterSkills,
  setFilterMaritalStatus
} = usersSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
// export const getAuth = (state: RootState) => state.auth.isAuth;
// export const getProfile = (state: RootState) => state.auth.profile;

export default usersSlice.reducer;
