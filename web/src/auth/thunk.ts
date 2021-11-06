import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, logoutApi } from "./api";
import { authorizationHeader } from "./authorization-header";
import { AuthStateSlice } from "./state";

export const login = createAsyncThunk("auth/login", loginApi);

export type AuthThunkConfig = {
  state: AuthStateSlice;
};

export const logout = createAsyncThunk<void, void, AuthThunkConfig>(
  "auth/logout",
  (_arg, thunkApi) => {
    const state = thunkApi.getState();
    const token = state.auth.token;
    if (token === null) {
      throw new Error("Must be logged in");
    }
    const baseHeaders = authorizationHeader(token);
    return logoutApi(baseHeaders);
  }
);
