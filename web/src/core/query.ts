export interface QueryResponse<Item> {
  count: number;
  prev: string | null;
  next: string | null;
  results: Item[];
}
