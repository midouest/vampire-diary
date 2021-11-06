import { FetchApi } from "core/fetch";
import { QueryResponse } from "core/query";
import { CreateVampireFormData, UpdateVampireFormData, Vampire } from "./model";

export const VAMPIRES_URL = "/api/v1/game/vampires/";

export function vampireUrl(id: number): string {
  return `${VAMPIRES_URL}${id}/`;
}

export async function queryVampiresApi(
  fetchApi: FetchApi
): Promise<QueryResponse<Vampire>> {
  const res = await fetchApi(VAMPIRES_URL);
  return res.json();
}

export async function createVampireApi(
  fetchApi: FetchApi,
  formData: CreateVampireFormData
): Promise<Vampire> {
  const res = await fetchApi(VAMPIRES_URL, {
    method: "POST",
    body: JSON.stringify(formData),
  });
  return res.json();
}

export async function retrieveVampireApi(
  fetchApi: FetchApi,
  id: number
): Promise<Vampire> {
  const res = await fetchApi(vampireUrl(id));
  return res.json();
}

export async function updateVampireApi(
  fetchApi: FetchApi,
  { id, ...formData }: UpdateVampireFormData
): Promise<Vampire> {
  const res = await fetchApi(vampireUrl(id), {
    method: "PATCH",
    body: JSON.stringify(formData),
  });
  return res.json();
}

export async function removeVampireApi(
  fetchApi: FetchApi,
  id: number
): Promise<void> {
  await fetchApi(vampireUrl(id), { method: "DELETE" });
}
