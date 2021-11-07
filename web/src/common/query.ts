export interface QueryResponse<Item> {
  count: number;
  prev: string | null;
  next: string | null;
  results: Item[];
}

export type FilterValue = number | boolean | string;

export type SortDir = "+" | "-";

export interface QueryParams<Entity> {
  search?: string;
  filter?: Record<keyof Entity, FilterValue>;
  sort?: [keyof Entity, SortDir];
}

export function createSearchParams<Entity>(
  queryParams: QueryParams<Entity>
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

  if (!modified) {
    return null;
  }

  return new URLSearchParams(record);
}
