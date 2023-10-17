import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface JobState {
  jobs: any;
  myPostedJobs: any;
  profileJobSearchResults: any;
}

// Define the initial state using that type
const initialState: JobState = {
  jobs: null,
  myPostedJobs: null,
  profileJobSearchResults: null,
};

export const jobSlice = createSlice({
  name: "jobs",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setJobs: (state, action: PayloadAction<any>) => {
      state.jobs = action.payload;
    },
    setMyPostedJobs: (state, action: PayloadAction<any>) => {
      state.myPostedJobs = action.payload;
    },
    setProfileJobSearchResults: (state, action: PayloadAction<any>) => {
      state.profileJobSearchResults = action.payload;
    },
  },
});

export const { setJobs, setMyPostedJobs, setProfileJobSearchResults } = jobSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const getJobs = (state: RootState) => state.;

export default jobSlice.reducer;
