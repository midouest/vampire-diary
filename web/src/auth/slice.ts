import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { buildAuthFetch, buildBaseFetch, FetchApi } from "common/fetch";
import { ThunkApi } from "common/thunk";
import { RootState } from "app/store";
import { loginApi, logoutApi } from "./api";
import { LoginFormData } from "./model";

export interface AuthState {
  token: string | null;
}

export const INITIAL_AUTH_STATE: AuthState = {
  token: null,
};

export const login = createAsyncThunk(
  "auth/login",
  (arg: LoginFormData, _thunkApi) => {
    const fetchApi = buildBaseFetch();
    return loginApi(fetchApi, arg);
  }
);

export function authFetchApi(thunkApi: ThunkApi): FetchApi {
  const state = thunkApi.getState() as RootState;
  const token = state.auth.token;
  if (token === null) {
    throw new Error("Must be logged in");
  }
  return buildAuthFetch(token);
}

export const logout = createAsyncThunk<void, void, {}>(
  "auth/logout",
  (_arg, thunkApi) => {
    const fetchApi = authFetchApi(thunkApi);
    return logoutApi(fetchApi);
  }
);

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

export function selectIsLoggedIn(state: RootState): boolean {
  return state.auth.token !== null;
}
