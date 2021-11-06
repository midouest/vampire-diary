import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { authFetchApi } from "auth/slice";
import { RootState } from "store";
import { createVampireApi, queryVampiresApi } from "./api";
import { CreateVampireFormData, Vampire } from "./model";

export const vampireAdapter = createEntityAdapter<Vampire>({
  selectId: (vampire) => vampire.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const queryVampires = createAsyncThunk(
  "vampire/queryVampires",
  (_arg, thunkApi) => {
    const fetchApi = authFetchApi(thunkApi);
    return queryVampiresApi(fetchApi);
  }
);

export const createVampire = createAsyncThunk(
  "vampire/createVampire",
  (arg: CreateVampireFormData, thunkApi) => {
    const fetchApi = authFetchApi(thunkApi);
    return createVampireApi(fetchApi, arg);
  }
);

export const vampireSlice = createSlice({
  name: "vampire",
  initialState: vampireAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(queryVampires.fulfilled, (state, action) => {
        vampireAdapter.setAll(state, action.payload.results);
      })
      .addCase(createVampire.fulfilled, (state, action) => {
        vampireAdapter.addOne(state, action.payload);
      }),
});

export const vampireSelectors = vampireAdapter.getSelectors<RootState>(
  (state) => state.vampire
);
