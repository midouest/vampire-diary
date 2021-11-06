import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_AUTH_STATE } from "./state";
import { login, logout } from "./thunk";

export const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_AUTH_STATE,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.key;
      })
      .addCase(logout.fulfilled, (state, _action) => {
        state.token = null;
      }),
});
