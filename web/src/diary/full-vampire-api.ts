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
  FullVampire,
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
} from "./full-vampire-model";

export async function retrieveFullVampireApi(
  fetchApi: FetchApi,
  id: number
): Promise<FullVampire> {
  const res = await fetchApi(`/api/v1/game/vampires/${id}/full/`);
  return res.json();
}

function baseUrl(resource: string): string {
  return `/api/v1/game/${resource}/`;
}

export const {
  createApi: createMemoryApi,
  updateApi: updateMemoryApi,
  removeApi: removeMemoryApi,
} = createCrudApi<Memory, CreateMemoryFormData, UpdateMemoryFormData>(
  baseUrl("memories")
);

export const {
  createApi: createExperienceApi,
  updateApi: updateExperienceApi,
  removeApi: removeExperienceApi,
} = createCrudApi<
  Experience,
  CreateExperienceFormData,
  UpdateExperienceFormData
>(baseUrl("experiences"));

export const {
  createApi: createSkillApi,
  updateApi: updateSkillApi,
  removeApi: removeSkillApi,
} = createCrudApi<Skill, CreateSkillFormData, UpdateSkillFormData>(
  baseUrl("skills")
);

export const {
  createApi: createResourceApi,
  updateApi: updateResourceApi,
  removeApi: removeResourceApi,
} = createCrudApi<Resource, CreateResourceFormData, UpdateResourceFormData>(
  baseUrl("resources")
);

export const {
  createApi: createCharacterApi,
  updateApi: updateCharacterApi,
  removeApi: removeCharacterApi,
} = createCrudApi<Character, CreateCharacterFormData, UpdateCharacterFormData>(
  baseUrl("characters")
);

export const {
  createApi: createMarkApi,
  updateApi: updateMarkApi,
  removeApi: removeMarkApi,
} = createCrudApi<Mark, CreateMarkFormData, UpdateMarkFormData>(
  baseUrl("marks")
);
