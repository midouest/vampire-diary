import { FetchApi } from "common/fetch";
import { QueryResponse } from "common/query";
import { PromptGroup } from "./model";

export const PROMPT_GROUPS_URL = "/api/v1/game/prompt-groups/";

export async function queryPromptGroupsApi(
  fetchApi: FetchApi
): Promise<QueryResponse<PromptGroup>> {
  const res = await fetchApi(PROMPT_GROUPS_URL);
  return res.json();
}
