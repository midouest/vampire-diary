export interface QueryResponse<Item> {
  count: number;
  prev: string | null;
  next: string | null;
  results: Item[];
}

export type FilterValue = number | boolean | string;

export type SortDir = "+" | "-";

export interface QueryParams {
  search?: string;
  filter?: Record<string, FilterValue>;
  sort?: [string, SortDir];
  limit?: number;
  offset?: number;
}

export function createSearchParams(
  queryParams: QueryParams
): URLSearchParams | null {
  const record: Record<string, string> = {};
  let modified = false;

  if (queryParams.search) {
    modified = true;
    record["search"] = queryParams.search;
  }

  if (queryParams.filter) {
    for (const [key, value] of Object.entries<FilterValue>(
      queryParams.filter
    )) {
      modified = true;
      record[key] = value.toString();
    }
  }

  if (queryParams.sort) {
    modified = true;
    record["ordering"] = `${queryParams.sort[1]}${queryParams.sort[0]}`;
  }

  if (queryParams.limit !== undefined) {
    modified = true;
    record["limit"] = queryParams.limit.toString();
  }

  if (queryParams.offset !== undefined) {
    modified = true;
    record["offset"] = queryParams.offset.toString();
  }

  if (!modified) {
    return null;
  }

  return new URLSearchParams(record);
}

export function prepareUrl(url: string, queryParams?: QueryParams): string {
  let searchParams = null;
  if (queryParams !== undefined) {
    searchParams = createSearchParams(queryParams);
  }

  if (searchParams !== null) {
    return `${url}?${searchParams}`;
  }

  return url;
}
