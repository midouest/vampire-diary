import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { FullVampire } from "./full-vampire-model";

const fullVampireAdapter = createEntityAdapter<FullVampire>({
  selectId: (vampire) => vampire.id,
  sortComparer: (a, b) => a.id - b.id,
});

export const fullVampireSlice = createSlice({
  name: "fullVampire",
  initialState: fullVampireAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {},
});

export const fullVampireSelectors = fullVampireAdapter.getSelectors(
  (state: RootState) => state.fullVampire
);
