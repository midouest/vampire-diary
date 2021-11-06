import { HeaderRecord } from "core";

import { LoginFormData } from "./login-form-data";
import { TokenResponse } from "./token-response";

export async function loginApi(
  formData: LoginFormData
): Promise<TokenResponse> {
  const res = await fetch("/api/v1/auth/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formData),
  });
  return res.json();
}

export async function logoutApi(baseHeaders: HeaderRecord): Promise<void> {
  await fetch("/api/v1/auth/logout/", {
    method: "POST",
    headers: {
      ...baseHeaders,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}
