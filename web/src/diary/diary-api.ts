import { createCrudApi } from "common/api";
import { FetchApi } from "common/fetch";
import {
  Character,
  CreateCharacterFormData,
  CreateExperienceFormData,
  CreateMarkFormData,
  CreateMemoryFormData,
  CreateResourceFormData,
  CreateSkillFormData,
  Experience,
  DeepVampire,
  Mark,
  Memory,
  Resource,
  Skill,
  UpdateCharacterFormData,
  UpdateExperienceFormData,
  UpdateMarkFormData,
  UpdateMemoryFormData,
  UpdateResourceFormData,
  UpdateSkillFormData,
  Event,
  CreateEventFormData,
  UpdateEventFormData,
} from "./diary-model";

export async function retrieveDeepVampireApi(
  fetchApi: FetchApi,
  id: number
): Promise<DeepVampire> {
  const res = await fetchApi(`/api/v1/game/vampires/${id}/deep/`);
  return res.json();
}

function baseUrl(resource: string): string {
  return `/api/v1/game/${resource}/`;
}

export const eventApi = createCrudApi<
  Event,
  CreateEventFormData,
  UpdateEventFormData
>(baseUrl("events"));

export const memoryApi = createCrudApi<
  Memory,
  CreateMemoryFormData,
  UpdateMemoryFormData
>(baseUrl("memories"));

export const experienceApi = createCrudApi<
  Experience,
  CreateExperienceFormData,
  UpdateExperienceFormData
>(baseUrl("experiences"));

export const skillApi = createCrudApi<
  Skill,
  CreateSkillFormData,
  UpdateSkillFormData
>(baseUrl("skills"));

export const resourceApi = createCrudApi<
  Resource,
  CreateResourceFormData,
  UpdateResourceFormData
>(baseUrl("resources"));

export const characterApi = createCrudApi<
  Character,
  CreateCharacterFormData,
  UpdateCharacterFormData
>(baseUrl("characters"));

export const markApi = createCrudApi<
  Mark,
  CreateMarkFormData,
  UpdateMarkFormData
>(baseUrl("marks"));
