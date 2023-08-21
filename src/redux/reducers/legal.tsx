import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface LegalState {
  legalData: any;
}

// Define the initial state using that type
const initialState: LegalState = {
  legalData: null,
};

export const legalSlice = createSlice({
  name: "legal",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setLegal: (state, action: PayloadAction<any>) => {
      state.legalData = action.payload;
    },
  },
});

export const { setLegal } = legalSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const getJobs = (state: RootState) => state.;

export default legalSlice.reducer;
