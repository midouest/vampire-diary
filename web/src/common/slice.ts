import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { authFetchApi } from "auth/slice";
import { FetchApi } from "./fetch";
import { createSearchParams, QueryParams, QueryResponse } from "./query";

export interface BaseEntity {
  id: number;
}

export interface CreateCrudApiSliceOptions {
  name: string;
  baseUrl: string;
}

export function prepareUrl(url: string, queryParams?: QueryParams): string {
  let searchParams = null;
  if (queryParams !== undefined) {
    searchParams = createSearchParams(queryParams);
  }

  if (searchParams !== null) {
    return `${url}?${searchParams}`;
  }

  return url;
}

async function queryApi<Entity extends BaseEntity>(
  fetchApi: FetchApi,
  url: string,
  params?: QueryParams
): Promise<QueryResponse<Entity>> {
  const queryUrl = prepareUrl(url, params);
  const res = await fetchApi(queryUrl);
  return res.json();
}

async function createApi<Entity extends BaseEntity, CreateEntity>(
  fetchApi: FetchApi,
  url: string,
  formData: CreateEntity
): Promise<Entity> {
  const res = await fetchApi(url, {
    method: "POST",
    body: JSON.stringify(formData),
  });
  return res.json();
}

async function retrieveApi<Entity extends BaseEntity>(
  fetchApi: FetchApi,
  url: string
): Promise<Entity> {
  const res = await fetchApi(url);
  return res.json();
}

async function updateApi<Entity extends BaseEntity, UpdateEntity>(
  fetchApi: FetchApi,
  url: string,
  formData: UpdateEntity
): Promise<Entity> {
  const res = await fetchApi(url, {
    method: "PATCH",
    body: JSON.stringify(formData),
  });
  return res.json();
}

async function removeApi(fetchApi: FetchApi, url: string): Promise<void> {
  await fetchApi(url, { method: "DELETE" });
}

export function createCrudApiSlice<
  Entity extends BaseEntity,
  CreateEntity,
  UpdateEntity extends BaseEntity
>({ name, baseUrl }: CreateCrudApiSliceOptions) {
  const adapter = createEntityAdapter<Entity>({
    selectId: (entity) => entity.id,
  });

  const query = createAsyncThunk(
    `${name}/query`,
    (params: QueryParams | undefined, thunkApi) => {
      const fetchApi = authFetchApi(thunkApi);
      return queryApi<Entity>(fetchApi, baseUrl, params);
    }
  );

  const create = createAsyncThunk(
    `${name}/create`,
    (formData: CreateEntity, thunkApi) => {
      const fetchApi = authFetchApi(thunkApi);
      return createApi<Entity, CreateEntity>(fetchApi, baseUrl, formData);
    }
  );

  const retrieve = createAsyncThunk(
    `${name}/retrieve`,
    (id: number, thunkApi) => {
      const fetchApi = authFetchApi(thunkApi);
      return retrieveApi<Entity>(fetchApi, `${baseUrl}${id}/`);
    }
  );

  const update = createAsyncThunk(
    `${name}/update`,
    ({ id, ...formData }: UpdateEntity, thunkApi) => {
      const fetchApi = authFetchApi(thunkApi);
      return updateApi<Entity, Omit<UpdateEntity, "id">>(
        fetchApi,
        `${baseUrl}${id}/`,
        formData
      );
    }
  );

  const remove = createAsyncThunk(
    `${name}/remove`,
    async (id: number, thunkApi) => {
      const fetchApi = authFetchApi(thunkApi);
      await removeApi(fetchApi, `${baseUrl}${id}/`);
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
