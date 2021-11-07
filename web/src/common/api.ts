import { BaseEntity } from "./entity";
import { FetchApi } from "./fetch";
import { prepareUrl, QueryParams, QueryResponse } from "./query";

export type QueryApi<Entity extends BaseEntity> = (
  fetchApi: FetchApi,
  params?: QueryParams
) => Promise<QueryResponse<Entity>>;

export type CreateApi<Entity extends BaseEntity, CreateEntity> = (
  fetchApi: FetchApi,
  formData: CreateEntity
) => Promise<Entity>;

export type RetrieveApi<Entity extends BaseEntity> = (
  fetchApi: FetchApi,
  id: number
) => Promise<Entity>;

export type UpdateApi<
  Entity extends BaseEntity,
  UpdateEntity extends BaseEntity
> = (fetchApi: FetchApi, formData: UpdateEntity) => Promise<Entity>;

export type RemoveApi = (fetchApi: FetchApi, id: number) => Promise<void>;

export interface CrudApi<
  Entity extends BaseEntity,
  CreateEntity,
  UpdateEntity extends BaseEntity
> {
  queryApi: QueryApi<Entity>;
  createApi: CreateApi<Entity, CreateEntity>;
  retrieveApi: RetrieveApi<Entity>;
  updateApi: UpdateApi<Entity, UpdateEntity>;
  removeApi: RemoveApi;
}

export function createCrudApi<
  Entity extends BaseEntity,
  CreateEntity,
  UpdateEntity extends BaseEntity
>(baseUrl: string): CrudApi<Entity, CreateEntity, UpdateEntity> {
  async function queryApi(
    fetchApi: FetchApi,
    params?: QueryParams
  ): Promise<QueryResponse<Entity>> {
    const queryUrl = prepareUrl(baseUrl, params);
    const res = await fetchApi(queryUrl);
    return res.json();
  }

  async function createApi(
    fetchApi: FetchApi,
    formData: CreateEntity
  ): Promise<Entity> {
    const res = await fetchApi(baseUrl, {
      method: "POST",
      body: JSON.stringify(formData),
    });
    return res.json();
  }

  function entityUrl(id: number): string {
    return `${baseUrl}${id}/`;
  }

  async function retrieveApi(fetchApi: FetchApi, id: number): Promise<Entity> {
    const res = await fetchApi(entityUrl(id));
    return res.json();
  }

  async function updateApi(
    fetchApi: FetchApi,
    { id, ...formData }: UpdateEntity
  ): Promise<Entity> {
    const res = await fetchApi(entityUrl(id), {
      method: "PATCH",
      body: JSON.stringify(formData),
    });
    return res.json();
  }

  async function removeApi(fetchApi: FetchApi, id: number): Promise<void> {
    await fetchApi(entityUrl(id), { method: "DELETE" });
  }

  return {
    queryApi,
    createApi,
    retrieveApi,
    updateApi,
    removeApi,
  };
}
