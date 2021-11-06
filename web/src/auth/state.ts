export interface AuthState {
  token: string | null;
}

export const INITIAL_AUTH_STATE: AuthState = {
  token: null,
};

export interface AuthStateSlice {
  auth: AuthState;
}
