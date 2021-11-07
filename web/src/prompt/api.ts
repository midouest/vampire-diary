import { FetchApi } from "common/fetch";
import { QueryParams, QueryResponse } from "common/query";
import { prepareUrl } from "common/slice";
import { Prompt } from "./model";

export const PROMPTS_URL = "/api/v1/game/prompts/";

export async function queryPromptsApi(
  fetchApi: FetchApi,
  queryParams?: QueryParams
): Promise<QueryResponse<Prompt>> {
  const url = prepareUrl(PROMPTS_URL, queryParams);
  const res = await fetchApi(url);
  return res.json();
}
