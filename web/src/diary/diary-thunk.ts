import { createAsyncThunk } from "@reduxjs/toolkit";
import { authFetchApi } from "auth/slice";
import { createCrudThunk } from "common/thunk";
import {
  characterApi,
  eventApi,
  experienceApi,
  markApi,
  memoryApi,
  resourceApi,
  retrieveDeepVampireApi,
  skillApi,
} from "./diary-api";

export const retrieveDeepVampire = createAsyncThunk(
  "diary/retrieveDeepVampire",
  (id: number, thunkApi) => {
    const fetchApi = authFetchApi(thunkApi);
    return retrieveDeepVampireApi(fetchApi, id);
  }
);

export const eventThunk = createCrudThunk("event", eventApi);

export const memoryThunk = createCrudThunk("memory", memoryApi);

export const experienceThunk = createCrudThunk("experience", experienceApi);

export const skillThunk = createCrudThunk("skill", skillApi);

export const resourceThunk = createCrudThunk("resource", resourceApi);

export const characterThunk = createCrudThunk("character", characterApi);

export const markThunk = createCrudThunk("mark", markApi);
