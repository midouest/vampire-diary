import { FetchApi } from "common/fetch";
import { QueryParams, QueryResponse } from "common/query";
import { prepareUrl } from "common/query";
import { PromptGroup } from "./prompt-group-model";

export const PROMPT_GROUPS_URL = "/api/v1/game/prompt-groups/";

export async function queryPromptGroupsApi(
  fetchApi: FetchApi,
  queryParams?: QueryParams
): Promise<QueryResponse<PromptGroup>> {
  const url = prepareUrl(PROMPT_GROUPS_URL, queryParams);
  const res = await fetchApi(url);
  return res.json();
}
