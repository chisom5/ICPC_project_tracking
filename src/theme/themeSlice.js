import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
};

export const themeSlice = createSlice({
  name: "themeReducer",
  initialState,

  reducers: {},
  extraReducers: (builder) => {},
});

export default themeSlice.reducer;
