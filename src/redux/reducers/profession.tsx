import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface ProfessionState {
  professions: any;
}

// Define the initial state using that type
const initialState: ProfessionState = {
  professions: null,
};

export const professionSlice = createSlice({
  name: "professions",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setProfessions: (state, action: PayloadAction<any>) => {
      state.professions = action.payload;
    },
  },
});

export const { setProfessions } = professionSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const getJobs = (state: RootState) => state.;

export default professionSlice.reducer;
