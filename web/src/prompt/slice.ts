import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { authFetchApi } from "auth/slice";
import { RootState } from "app/store";
import { Prompt } from "./model";
import { queryPromptsApi } from "./api";

export const promptAdapter = createEntityAdapter<Prompt>({
  selectId: (prompt) => prompt.id,
  sortComparer: (a, b) => a.id - b.id,
});

export const queryprompts = createAsyncThunk(
  "prompt/queryPrompts",
  (_arg, thunkApi) => {
    const fetchApi = authFetchApi(thunkApi);
    return queryPromptsApi(fetchApi);
  }
);

export const promptSlice = createSlice({
  name: "prompt",
  initialState: promptAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(queryprompts.fulfilled, (state, action) => {
      promptAdapter.setAll(state, action.payload.results);
    }),
});

export const promptSelectors = promptAdapter.getSelectors<RootState>(
  (state) => state.prompt
);
