export type FetchApi = typeof fetch;

export type HeaderRecord = Record<string, string>;

export function buildFetch(baseHeaders: HeaderRecord): FetchApi {
  return function (resource, init) {
    const fetchOptions = init ?? {};
    fetchOptions.headers = {
      ...baseHeaders,
      ...(fetchOptions.headers ?? {}),
    };
    return fetch(resource, fetchOptions);
  };
}

export function buildBaseHeaders(): HeaderRecord {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

export function buildAuthHeader(token: string): HeaderRecord {
  return {
    Authorization: `Token ${token}`,
  };
}

export function buildBaseFetch(): FetchApi {
  return buildFetch(buildBaseHeaders());
}

export function buildAuthFetch(token: string): FetchApi {
  return buildFetch({
    ...buildBaseHeaders(),
    ...buildAuthHeader(token),
  });
}
