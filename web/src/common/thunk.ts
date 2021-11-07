import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import { authFetchApi } from "auth/slice";
import { CrudApi } from "./api";
import { BaseEntity } from "./entity";
import { QueryParams, QueryResponse } from "./query";

export interface ThunkApi {
  getState(): unknown;
}

export type QueryThunk<Entity extends BaseEntity> = AsyncThunk<
  QueryResponse<Entity>,
  QueryParams | undefined,
  {}
>;

export type CreateThunk<Entity extends BaseEntity, CreateEntity> = AsyncThunk<
  Entity,
  CreateEntity,
  {}
>;

export type RetrieveThunk<Entity extends BaseEntity> = AsyncThunk<
  Entity,
  number,
  {}
>;

export type UpdateThunk<
  Entity extends BaseEntity,
  UpdateEntity extends BaseEntity
> = AsyncThunk<Entity, UpdateEntity, {}>;

export type RemoveThunk = AsyncThunk<number, number, {}>;

export interface CrudThunk<
  Entity extends BaseEntity,
  CreateEntity,
  UpdateEntity extends BaseEntity
> {
  query: QueryThunk<Entity>;
  create: CreateThunk<Entity, CreateEntity>;
  retrieve: RetrieveThunk<Entity>;
  update: UpdateThunk<Entity, UpdateEntity>;
  remove: RemoveThunk;
}

export function createCrudThunk<
  Entity extends BaseEntity,
  CreateEntity,
  UpdateEntity extends BaseEntity
>(
  name: string,
  crudApi: CrudApi<Entity, CreateEntity, UpdateEntity>
): CrudThunk<Entity, CreateEntity, UpdateEntity> {
  const { queryApi, createApi, retrieveApi, updateApi, removeApi } = crudApi;

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

  return { query, create, retrieve, update, remove };
}
