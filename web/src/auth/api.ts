import { FetchApi } from "common/fetch";
import { LoginFormData, TokenResponse } from "./model";

export async function loginApi(
  fetchApi: FetchApi,
  formData: LoginFormData
): Promise<TokenResponse> {
  const res = await fetchApi("/api/v1/auth/login/", {
    method: "POST",
    body: JSON.stringify(formData),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json);
  }
  return json;
}

export async function logoutApi(fetchApi: FetchApi): Promise<void> {
  await fetchApi("/api/v1/auth/logout/", {
    method: "POST",
  });
}
