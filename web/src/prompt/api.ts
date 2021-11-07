import { FetchApi } from "common/fetch";
import { QueryResponse } from "common/query";
import { Prompt } from "./model";

export const PROMPTS_URL = "/api/v1/game/prompts/";

export async function queryPromptsApi(
  fetchApi: FetchApi
): Promise<QueryResponse<Prompt>> {
  const res = await fetchApi(PROMPTS_URL);
  return res.json();
}
