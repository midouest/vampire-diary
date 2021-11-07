import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { authFetchApi } from "auth/slice";
import { RootState } from "app/store";
import { queryPromptGroupsApi } from "./api";
import { PromptGroup } from "./model";

export const promptGroupAdapter = createEntityAdapter<PromptGroup>({
  selectId: (promptGroup) => promptGroup.id,
  sortComparer: (a, b) => a.id - b.id,
});

export const queryPromptGroups = createAsyncThunk(
  "promptGroup/queryPromptGroups",
  (_arg, thunkApi) => {
    const fetchApi = authFetchApi(thunkApi);
    return queryPromptGroupsApi(fetchApi);
  }
);

export const promptGroupSlice = createSlice({
  name: "promptGroup",
  initialState: promptGroupAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(queryPromptGroups.fulfilled, (state, action) => {
      promptGroupAdapter.setAll(state, action.payload.results);
    }),
});

export const promptGroupSelectors = promptGroupAdapter.getSelectors<RootState>(
  (state) => state.promptGroup
);
