import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { authFetchApi } from "auth/slice";
import { createCrudApi } from "./api";
import { BaseEntity } from "./entity";
import { QueryParams } from "./query";

export interface CreateCrudApiSliceOptions {
  name: string;
  baseUrl: string;
}

export function createCrudApiSlice<
  Entity extends BaseEntity,
  CreateEntity,
  UpdateEntity extends BaseEntity
>({ name, baseUrl }: CreateCrudApiSliceOptions) {
  const adapter = createEntityAdapter<Entity>({
    selectId: (entity) => entity.id,
  });

  const { queryApi, createApi, retrieveApi, updateApi, removeApi } =
    createCrudApi<Entity, CreateEntity, UpdateEntity>(baseUrl);

  const query = createAsyncThunk(
    `${name}/query`,
    (params: QueryParams | undefined, thunkApi) => {
      const fetchApi = authFetchApi(thunkApi);
      return queryApi(fetchApi, params);
    }
  );

  const create = createAsyncThunk(
    `${name}/create`,
    (formData: CreateEntity, thunkApi) => {
      const fetchApi = authFetchApi(thunkApi);
      return createApi(fetchApi, formData);
    }
  );

  const retrieve = createAsyncThunk(
    `${name}/retrieve`,
    (id: number, thunkApi) => {
      const fetchApi = authFetchApi(thunkApi);
      return retrieveApi(fetchApi, id);
    }
  );

  const update = createAsyncThunk(
    `${name}/update`,
    (formData: UpdateEntity, thunkApi) => {
      const fetchApi = authFetchApi(thunkApi);
      return updateApi(fetchApi, formData);
    }
  );

  const remove = createAsyncThunk(
    `${name}/remove`,
    async (id: number, thunkApi) => {
      const fetchApi = authFetchApi(thunkApi);
      await removeApi(fetchApi, id);
      return id;
    }
  );

  const slice = createSlice({
    name,
    initialState: adapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) =>
      builder
        .addCase(query.fulfilled, (state: any, action: any) => {
          adapter.setAll(state, action.payload.results);
        })
        .addCase(create.fulfilled, (state: any, action: any) => {
          adapter.addOne(state, action.payload);
        })
        .addCase(retrieve.fulfilled, (state: any, action: any) => {
          adapter.setOne(state, action.payload);
        })
        .addCase(update.fulfilled, (state: any, action: any) => {
          adapter.setOne(state, action.payload);
        })
        .addCase(remove.fulfilled, (state: any, action: any) => {
          adapter.removeOne(state, action.payload);
        }),
  });

  return {
    adapter,
    query,
    create,
    retrieve,
    update,
    remove,
    slice,
  };
}
