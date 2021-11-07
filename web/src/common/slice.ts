import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { createCrudApi } from "./api";
import { BaseEntity } from "./entity";
import { createCrudThunk } from "./thunk";

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

  const api = createCrudApi<Entity, CreateEntity, UpdateEntity>(baseUrl);
  const { query, create, retrieve, update, remove } = createCrudThunk(
    name,
    api
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
