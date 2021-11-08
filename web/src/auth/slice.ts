import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { buildAuthFetch, buildBaseFetch, FetchApi } from "common/fetch";
import { ThunkApi } from "common/thunk";
import { RootState } from "app/store";
import { loginApi, logoutApi } from "./api";
import { LoginFormData } from "./model";

export interface AuthState {
  token: string | null;
}

export const AUTH_TOKEN_KEY = "vampire-diary-auth-token";

export function getInitialAuthState(): AuthState {
  return {
    token: localStorage.getItem(AUTH_TOKEN_KEY),
  };
}

export const login = createAsyncThunk(
  "auth/login",
  async (arg: LoginFormData, _thunkApi) => {
    const fetchApi = buildBaseFetch();
    const res = await loginApi(fetchApi, arg);
    localStorage.setItem(AUTH_TOKEN_KEY, res.key);
    return res;
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
  async (_arg, thunkApi) => {
    const fetchApi = authFetchApi(thunkApi);
    await logoutApi(fetchApi);
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: getInitialAuthState(),
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
