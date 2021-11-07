import { FetchApi } from "common/fetch";
import { FullVampire } from "./full-vampire-model";

export async function retrieveFullVampireApi(
  fetchApi: FetchApi,
  id: number
): Promise<FullVampire> {
  const res = await fetchApi(`/api/v1/game/vampires/${id}/full/`);
  return res.json();
}
