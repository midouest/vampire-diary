import { HeaderRecord } from "core";

export function authorizationHeader(token: string): HeaderRecord {
  return {
    Authorization: `Token ${token}`,
  };
}
