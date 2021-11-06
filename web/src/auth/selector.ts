import { AuthStateSlice } from "./state";

export function selectIsLoggedIn(state: AuthStateSlice): boolean {
  return state.auth.token !== null;
}
